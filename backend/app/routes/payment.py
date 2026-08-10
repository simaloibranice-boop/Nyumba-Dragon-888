from uuid import uuid4

from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.payment import Payment
from app.models.service_request import ServiceRequest
from app.models.user import User

from app.services.wallet_service import (
    credit_wallet_for_payment
)

from app.services.notification_service import (
    notify_wallet_credit
)

from app.services.mpesa_service import (
    mpesa_service,
    MpesaError
)


payment_bp = Blueprint(
    "payment",
    __name__,
    url_prefix="/api/client/payments"
)


# ============================================================
# CREATE PAYMENT + M-PESA STK PUSH
# ============================================================

@payment_bp.route("", methods=["POST"])
@jwt_required()
def create_payment():

    try:

        user_id = int(get_jwt_identity())

        data = request.get_json() or {}

        service_request_id = data.get(
            "service_request_id"
        )

        payment_method = data.get(
            "payment_method",
            "M-PESA"
        )

        phone_number = data.get(
            "phone_number"
        )

        # ====================================================
        # VALIDATE SERVICE REQUEST ID
        # ====================================================

        if not service_request_id:

            return jsonify({
                "message": "service_request_id is required"
            }), 400

        # ====================================================
        # FIND CLIENT'S SERVICE REQUEST
        # ====================================================

        service_request = ServiceRequest.query.filter_by(
            id=service_request_id,
            customer_id=user_id
        ).first()

        if not service_request:

            return jsonify({
                "message": "Service request not found"
            }), 404

        # ====================================================
        # TECHNICIAN MUST BE ASSIGNED
        # ====================================================

        if not service_request.technician_id:

            return jsonify({
                "message": (
                    "A technician must be assigned "
                    "before payment"
                )
            }), 409

        # ====================================================
        # GET SERVICE PRICE
        # ====================================================

        amount = float(
            service_request.price or 0
        )

        if amount <= 0:

            return jsonify({
                "message": (
                    "This service request does not "
                    "have a valid price"
                )
            }), 400

        # ====================================================
        # NORMALIZE PAYMENT METHOD
        # ====================================================

        payment_method = str(
            payment_method
        ).strip().upper()

        # ====================================================
        # M-PESA PHONE REQUIRED
        # ====================================================

        if payment_method == "M-PESA" and not phone_number:

            return jsonify({
                "message": (
                    "phone_number is required "
                    "for M-PESA payment"
                )
            }), 400

        # ====================================================
        # CHECK IF ALREADY PAID
        # ====================================================

        existing_payment = Payment.query.filter_by(
            service_request_id=service_request.id,
            customer_id=user_id,
            status="PAID"
        ).first()

        if existing_payment:

            return jsonify({
                "message": (
                    "This service request "
                    "has already been paid"
                ),
                "payment": existing_payment.to_dict()
            }), 409

        # ====================================================
        # CHECK FOR EXISTING PENDING PAYMENT
        # ====================================================

        existing_pending = Payment.query.filter_by(
            service_request_id=service_request.id,
            customer_id=user_id,
            status="PENDING"
        ).first()

        if existing_pending:

            return jsonify({
                "message": "A payment is already pending",
                "payment": existing_pending.to_dict()
            }), 200

        # ====================================================
        # CREATE PAYMENT RECORD
        # ====================================================

        payment = Payment(
            amount=amount,
            currency="KES",
            payment_method=payment_method,
            status="PENDING",
            phone_number=phone_number,
            customer_id=user_id,
            service_request_id=service_request.id
        )

        db.session.add(payment)

        # ====================================================
        # FLUSH TO GET PAYMENT ID
        # ====================================================

        db.session.flush()

        stk_response = None

        # ====================================================
        # M-PESA STK PUSH
        # ====================================================

        if payment_method == "M-PESA":

            try:

                stk_response = mpesa_service.stk_push(
                    amount=amount,
                    phone_number=phone_number,
                    account_reference=f"PAY{payment.id}",
                    transaction_desc="Nyumba Dragon"
                )

            except MpesaError as exc:

                db.session.rollback()

                return jsonify({
                    "message": str(exc),
                    "type": "MpesaError"
                }), 502

            # =================================================
            # SAVE SAFARICOM REQUEST IDs
            # =================================================

            payment.merchant_request_id = (
                stk_response.get(
                    "MerchantRequestID"
                )
            )

            payment.checkout_request_id = (
                stk_response.get(
                    "CheckoutRequestID"
                )
            )

            # =================================================
            # CHECK DARaja RESPONSE
            # =================================================

            response_code = stk_response.get(
                "ResponseCode"
            )

            if response_code != "0":

                payment.status = "FAILED"

                payment.result_code = (
                    int(response_code)
                    if str(response_code).isdigit()
                    else None
                )

                payment.result_description = (
                    stk_response.get(
                        "ResponseDescription"
                    )
                )

                db.session.commit()

                return jsonify({
                    "message": (
                        "M-PESA STK Push failed"
                    ),
                    "payment": payment.to_dict(),
                    "mpesa_response": stk_response
                }), 502

            # =================================================
            # STK REQUEST ACCEPTED
            # =================================================

            payment.result_code = 0

            payment.result_description = (
                stk_response.get(
                    "ResponseDescription"
                )
            )

        # ====================================================
        # NON M-PESA PAYMENT
        # ====================================================

        else:

            payment.result_description = (
                "Payment created"
            )

        # ====================================================
        # COMMIT PAYMENT
        # ====================================================

        db.session.commit()

        return jsonify({
            "message": (
                "Payment created and M-PESA "
                "STK Push sent successfully"
                if payment_method == "M-PESA"
                else "Payment created successfully"
            ),

            "payment": payment.to_dict(),

            "mpesa_response": stk_response
        }), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "message": str(e),
            "type": type(e).__name__
        }), 500


# ============================================================
# GET CLIENT PAYMENT HISTORY
# ============================================================

@payment_bp.route("", methods=["GET"])
@jwt_required()
def get_payments():

    try:

        user_id = int(
            get_jwt_identity()
        )

        payments = Payment.query.filter_by(
            customer_id=user_id
        ).order_by(
            Payment.created_at.desc()
        ).all()

        return jsonify([
            payment.to_dict()
            for payment in payments
        ]), 200

    except Exception as e:

        return jsonify({
            "message": str(e),
            "type": type(e).__name__
        }), 500


# ============================================================
# GET SINGLE PAYMENT
# ============================================================

@payment_bp.route(
    "/<int:payment_id>",
    methods=["GET"]
)
@jwt_required()
def get_payment(payment_id):

    try:

        user_id = int(
            get_jwt_identity()
        )

        payment = Payment.query.filter_by(
            id=payment_id,
            customer_id=user_id
        ).first()

        if not payment:

            return jsonify({
                "message": "Payment not found"
            }), 404

        return jsonify({
            "payment": payment.to_dict()
        }), 200

    except Exception as e:

        return jsonify({
            "message": str(e),
            "type": type(e).__name__
        }), 500


# ============================================================
# M-PESA DARaja CALLBACK
# ============================================================

@payment_bp.route(
    "/mpesa/callback",
    methods=["POST"]
)
def mpesa_callback():

    try:

        data = request.get_json(
            silent=True
        ) or {}

        print("\n====================================")
        print("M-PESA CALLBACK RECEIVED")
        print("====================================")
        print(data)
        print("====================================\n")

        stk_callback = (
            data
            .get("Body", {})
            .get("stkCallback", {})
        )

        if not stk_callback:

            return jsonify({
                "ResultCode": 0,
                "ResultDesc": "Accepted"
            }), 200

        merchant_request_id = (
            stk_callback.get(
                "MerchantRequestID"
            )
        )

        checkout_request_id = (
            stk_callback.get(
                "CheckoutRequestID"
            )
        )

        result_code = stk_callback.get(
            "ResultCode"
        )

        result_description = (
            stk_callback.get(
                "ResultDesc"
            )
        )

        # ====================================================
        # FIND PAYMENT
        # ====================================================

        payment = None

        if checkout_request_id:

            payment = Payment.query.filter_by(
                checkout_request_id=checkout_request_id
            ).first()

        if not payment and merchant_request_id:

            payment = Payment.query.filter_by(
                merchant_request_id=merchant_request_id
            ).first()

        # ====================================================
        # PAYMENT NOT FOUND
        # ====================================================

        if not payment:

            print(
                "M-PESA callback payment not found:",
                checkout_request_id
            )

            return jsonify({
                "ResultCode": 0,
                "ResultDesc": "Accepted"
            }), 200

        # ====================================================
        # SAVE CALLBACK DATA
        # ====================================================

        payment.result_code = result_code

        payment.result_description = (
            result_description
        )

        # ====================================================
        # SUCCESSFUL PAYMENT
        # ====================================================

        if result_code == 0:

            # ================================================
            # EXTRACT CALLBACK METADATA
            # ================================================

            callback_metadata = (
                stk_callback
                .get("CallbackMetadata", {})
                .get("Item", [])
            )

            metadata = {}

            for item in callback_metadata:

                name = item.get("Name")

                value = item.get("Value")

                if name:

                    metadata[name] = value

            # ================================================
            # SAVE M-PESA RECEIPT
            # ================================================

            mpesa_receipt = metadata.get(
                "MpesaReceiptNumber"
            )

            if mpesa_receipt:

                payment.mpesa_receipt_number = (
                    str(mpesa_receipt)
                )

                payment.transaction_reference = (
                    str(mpesa_receipt)
                )

            # ================================================
            # PAYMENT ALREADY PROCESSED
            # ================================================

            if payment.status == "PAID":

                db.session.commit()

                return jsonify({
                    "ResultCode": 0,
                    "ResultDesc": "Accepted"
                }), 200

            # ================================================
            # MARK PAYMENT PAID
            # ================================================

            payment.status = "PAID"

            # ================================================
            # CREDIT TECHNICIAN WALLET
            # ================================================

            wallet = credit_wallet_for_payment(
                payment
            )

            # ================================================
            # COMMIT PAYMENT + WALLET TOGETHER
            # ================================================

            db.session.commit()

            # ================================================
            # FIND TECHNICIAN
            # ================================================

            technician = User.query.filter_by(
                id=wallet.user_id
            ).first()

            # ================================================
            # NOTIFY TECHNICIAN
            # ================================================

            if technician:

                reference = (
                    payment.mpesa_receipt_number
                    or payment.transaction_reference
                    or f"PAY-{payment.id}"
                )

                notify_wallet_credit(
                    technician,
                    payment.amount,
                    reference,
                    payment.service_request_id
                )

            print(
                "M-PESA PAYMENT SUCCESS:",
                payment.id
            )

        # ====================================================
        # FAILED / CANCELLED PAYMENT
        # ====================================================

        else:

            payment.status = "FAILED"

            db.session.commit()

            print(
                "M-PESA PAYMENT FAILED:",
                payment.id,
                result_code,
                result_description
            )

        # ====================================================
        # ALWAYS ACKNOWLEDGE CALLBACK
        # ====================================================

        return jsonify({
            "ResultCode": 0,
            "ResultDesc": "Accepted"
        }), 200

    except Exception as e:

        db.session.rollback()

        print(
            "M-PESA CALLBACK ERROR:",
            str(e)
        )

        # Safaricom should still receive
        # an HTTP response.
        return jsonify({
            "ResultCode": 0,
            "ResultDesc": "Accepted"
        }), 200


# ============================================================
# DEVELOPMENT PAYMENT CONFIRMATION
# ============================================================

@payment_bp.route(
    "/<int:payment_id>/confirm",
    methods=["PUT"]
)
@jwt_required()
def confirm_payment(payment_id):

    try:

        user_id = int(
            get_jwt_identity()
        )

        # ====================================================
        # FIND PAYMENT
        # ====================================================

        payment = Payment.query.filter_by(
            id=payment_id,
            customer_id=user_id
        ).first()

        if not payment:

            return jsonify({
                "message": "Payment not found"
            }), 404

        # ====================================================
        # ALREADY PAID
        # ====================================================

        if payment.status == "PAID":

            return jsonify({
                "message": "Payment already confirmed",
                "payment": payment.to_dict()
            }), 200

        # ====================================================
        # ONLY PENDING CAN BE CONFIRMED
        # ====================================================

        if payment.status != "PENDING":

            return jsonify({
                "message": (
                    "Payment cannot be confirmed "
                    f"from status {payment.status}"
                )
            }), 409

        # ====================================================
        # FIND SERVICE REQUEST
        # ====================================================

        service_request = ServiceRequest.query.filter_by(
            id=payment.service_request_id,
            customer_id=user_id
        ).first()

        if not service_request:

            return jsonify({
                "message": "Service request not found"
            }), 404

        # ====================================================
        # TECHNICIAN REQUIRED
        # ====================================================

        if not service_request.technician_id:

            return jsonify({
                "message": (
                    "No technician is assigned "
                    "to this service request"
                )
            }), 409

        # ====================================================
        # GENERATE DEV REFERENCE
        # ====================================================

        payment.transaction_reference = (
            f"DEV-{uuid4().hex[:16].upper()}"
        )

        # ====================================================
        # MARK PAID
        # ====================================================

        payment.status = "PAID"

        db.session.flush()

        # ====================================================
        # CREDIT WALLET
        # ====================================================

        wallet = credit_wallet_for_payment(
            payment
        )

        # ====================================================
        # COMMIT EVERYTHING
        # ====================================================

        db.session.commit()

        # ====================================================
        # FIND TECHNICIAN
        # ====================================================

        technician = User.query.filter_by(
            id=wallet.user_id
        ).first()

        # ====================================================
        # NOTIFY TECHNICIAN
        # ====================================================

        if technician:

            notify_wallet_credit(
                technician,
                payment.amount,
                payment.transaction_reference,
                payment.service_request_id
            )

        return jsonify({
            "message": (
                "Payment confirmed successfully"
            ),
            "payment": payment.to_dict(),
            "wallet": wallet.to_dict()
        }), 200

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "message": str(e),
            "type": type(e).__name__
        }), 500
