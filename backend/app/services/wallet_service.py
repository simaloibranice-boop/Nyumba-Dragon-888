from uuid import uuid4

from app.extensions import db
from app.models.wallet import Wallet
from app.models.wallet_transaction import WalletTransaction
from app.models.payment import Payment
from app.models.service_request import ServiceRequest


def generate_wallet_reference():
    """
    Generate a unique internal wallet transaction reference.
    """

    return f"WALLET-{uuid4().hex[:20].upper()}"


def get_or_create_wallet(user_id):
    """
    Get a user's wallet.

    If the wallet does not exist, create it with
    a zero balance.
    """

    wallet = Wallet.query.filter_by(
        user_id=user_id
    ).first()

    if wallet:
        return wallet

    wallet = Wallet(
        user_id=user_id,
        balance=0.0,
        pending_balance=0.0,
        currency="KES"
    )

    db.session.add(wallet)
    db.session.flush()

    return wallet


def credit_wallet_for_payment(payment):
    """
    Credit the assigned technician's wallet
    for a confirmed PAID payment.

    This function is idempotent:
    the same payment cannot create
    another wallet transaction.
    """

    if not payment:
        raise ValueError("Payment is required")

    if payment.status != "PAID":
        raise ValueError(
            "Only PAID payments can be credited to a wallet"
        )

    # =====================================
    # PREVENT DUPLICATE CREDIT
    # =====================================

    existing_transaction = WalletTransaction.query.filter_by(
        payment_id=payment.id
    ).first()

    if existing_transaction:

        wallet = Wallet.query.get(
            existing_transaction.wallet_id
        )

        if not wallet:
            raise ValueError(
                "Wallet associated with transaction was not found"
            )

        return wallet

    # =====================================
    # FIND SERVICE REQUEST
    # =====================================

    service_request = ServiceRequest.query.filter_by(
        id=payment.service_request_id
    ).first()

    if not service_request:
        raise ValueError(
            "Service request associated with payment was not found"
        )

    # =====================================
    # FIND ASSIGNED TECHNICIAN
    # =====================================

    technician_id = service_request.technician_id

    if not technician_id:
        raise ValueError(
            "No technician is assigned to this service request"
        )

    # =====================================
    # VALIDATE PAYMENT AMOUNT
    # =====================================

    amount = float(payment.amount or 0)

    if amount <= 0:
        raise ValueError(
            "Payment amount must be greater than zero"
        )

    # =====================================
    # GET OR CREATE WALLET
    # =====================================

    wallet = get_or_create_wallet(
        technician_id
    )

    # =====================================
    # CREDIT BALANCE
    # =====================================

    wallet.balance = float(
        wallet.balance or 0.0
    ) + amount

    # =====================================
    # CREATE TRANSACTION
    # =====================================

    transaction = WalletTransaction(
        wallet_id=wallet.id,
        transaction_type="CREDIT",
        amount=amount,
        status="COMPLETED",
        description=(
            f"Payment for service request "
            f"#{service_request.id}"
        ),
        reference=generate_wallet_reference(),
        payment_id=payment.id
    )

    db.session.add(transaction)

    # Flush so the transaction is assigned an ID
    db.session.flush()

    return wallet


def credit_wallet_for_payment_id(payment_id):
    """
    Find a payment by ID and credit the
    assigned technician's wallet.
    """

    payment = Payment.query.get(payment_id)

    if not payment:
        raise ValueError(
            "Payment not found"
        )

    return credit_wallet_for_payment(payment)
