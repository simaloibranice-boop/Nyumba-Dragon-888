from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from uuid import uuid4

from app.extensions import db
from app.models.wallet import Wallet
from app.models.wallet_transaction import WalletTransaction
from app.services.notification_service import notify_wallet_withdrawal


wallet_bp = Blueprint(
    "wallet",
    __name__,
    url_prefix="/api/technician/wallet"
)


# =====================================
# GET OR CREATE TECHNICIAN WALLET
# =====================================

@wallet_bp.route("", methods=["GET"])
@jwt_required()
def get_wallet():

    try:

        user_id = int(get_jwt_identity())

        wallet = Wallet.query.filter_by(
            user_id=user_id
        ).first()

        if not wallet:

            wallet = Wallet(
                user_id=user_id,
                balance=0.0,
                pending_balance=0.0,
                currency="KES"
            )

            db.session.add(wallet)
            db.session.commit()

        return jsonify({
            "wallet": wallet.to_dict()
        }), 200

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "message": str(e),
            "type": type(e).__name__
        }), 500


# =====================================
# GET WALLET TRANSACTIONS
# =====================================

@wallet_bp.route("/transactions", methods=["GET"])
@jwt_required()
def get_wallet_transactions():

    try:

        user_id = int(get_jwt_identity())

        wallet = Wallet.query.filter_by(
            user_id=user_id
        ).first()

        if not wallet:

            return jsonify({
                "transactions": []
            }), 200

        transactions = WalletTransaction.query.filter_by(
            wallet_id=wallet.id
        ).order_by(
            WalletTransaction.created_at.desc()
        ).all()

        return jsonify({
            "transactions": [
                transaction.to_dict()
                for transaction in transactions
            ]
        }), 200

    except Exception as e:

        return jsonify({
            "message": str(e),
            "type": type(e).__name__
        }), 500


# =====================================
# DEVELOPMENT WITHDRAWAL
# =====================================
#
# This is a development/testing endpoint.
#
# Later this will call M-Pesa Daraja B2C.
#
# =====================================

@wallet_bp.route("/withdraw", methods=["POST"])
@jwt_required()
def withdraw():

    try:

        user_id = int(get_jwt_identity())

        data = request.get_json() or {}

        amount = data.get("amount")
        phone_number = data.get("phone_number")

        # ---------------------------------
        # Validate amount
        # ---------------------------------

        if amount is None:

            return jsonify({
                "message": "amount is required"
            }), 400

        try:

            amount = float(amount)

        except (TypeError, ValueError):

            return jsonify({
                "message": "amount must be a valid number"
            }), 400

        if amount <= 0:

            return jsonify({
                "message": "amount must be greater than zero"
            }), 400

        # ---------------------------------
        # Validate phone number
        # ---------------------------------

        if not phone_number:

            return jsonify({
                "message": "phone_number is required"
            }), 400

        # ---------------------------------
        # Find wallet
        # ---------------------------------

        wallet = Wallet.query.filter_by(
            user_id=user_id
        ).first()

        if not wallet:

            return jsonify({
                "message": "Wallet not found"
            }), 404

        # ---------------------------------
        # Check balance
        # ---------------------------------

        balance = float(wallet.balance or 0)

        if amount > balance:

            return jsonify({
                "message": "Insufficient wallet balance",
                "balance": balance,
                "requested_amount": amount
            }), 400

        # ---------------------------------
        # Generate withdrawal reference
        # ---------------------------------

        reference = (
            f"WD-{uuid4().hex[:16].upper()}"
        )

        # ---------------------------------
        # Deduct wallet balance
        # ---------------------------------

        wallet.balance = balance - amount

        # ---------------------------------
        # Create withdrawal transaction
        # ---------------------------------

        transaction = WalletTransaction(
            wallet_id=wallet.id,
            transaction_type="WITHDRAWAL",
            amount=amount,
            status="COMPLETED",
            description=(
                f"Development M-Pesa withdrawal "
                f"to {phone_number}"
            ),
            reference=reference
        )

        db.session.add(transaction)

        # ---------------------------------
        # Commit atomically
        # ---------------------------------

        db.session.commit()

        # ---------------------------------
        # Notify technician
        # ---------------------------------

        from app.models.user import User

        technician = User.query.filter_by(
            id=user_id
        ).first()

        if technician:
            notify_wallet_withdrawal(
                technician,
                amount,
                phone_number,
                reference,
                wallet.balance
            )

        return jsonify({

            "message": (
                "Withdrawal completed successfully"
            ),

            "withdrawal": {
                "amount": amount,
                "phone_number": phone_number,
                "reference": reference,
                "status": "COMPLETED"
            },

            "wallet": wallet.to_dict(),

            "transaction": transaction.to_dict()

        }), 200

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "message": str(e),
            "type": type(e).__name__
        }), 500
