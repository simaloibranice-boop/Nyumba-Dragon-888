from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.extensions import db
from app.models.payment import Payment
from app.models.service_request import ServiceRequest


payment_bp = Blueprint(
    "payment",
    __name__,
    url_prefix="/api/client/payments"
)


# =====================================
# CREATE PAYMENT
# =====================================

@payment_bp.route("", methods=["POST"])
@jwt_required()
def create_payment():

    try:
        user_id = int(get_jwt_identity())
        data = request.get_json() or {}

        service_request_id = data.get("service_request_id")
        payment_method = data.get(
            "payment_method",
            "M-PESA"
        )
        phone_number = data.get("phone_number")

        # -----------------------------
        # Validate request ID
        # -----------------------------

        if not service_request_id:
            return jsonify({
                "message": "service_request_id is required"
            }), 400

        # -----------------------------
        # Find client's service request
        # -----------------------------

        service_request = ServiceRequest.query.filter_by(
            id=service_request_id,
            customer_id=user_id
        ).first()

        if not service_request:
            return jsonify({
                "message": "Service request not found"
            }), 404

        # -----------------------------
        # Get price from service request
        # -----------------------------

        amount = service_request.price or 0

        if amount <= 0:
            return jsonify({
                "message": (
                    "This service request does not "
                    "have a valid price"
                )
            }), 400

        # -----------------------------
        # Prevent duplicate paid payment
        # -----------------------------

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

        # -----------------------------
        # Create payment
        # -----------------------------

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
        db.session.commit()

        return jsonify({
            "message": "Payment created",
            "payment": payment.to_dict()
        }), 201

    except Exception as e:

        db.session.rollback()

        return jsonify({
            "message": str(e),
            "type": type(e).__name__
        }), 500


# =====================================
# GET CLIENT PAYMENT HISTORY
# =====================================

@payment_bp.route("", methods=["GET"])
@jwt_required()
def get_payments():

    try:

        user_id = int(get_jwt_identity())

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


# =====================================
# GET SINGLE PAYMENT
# =====================================

@payment_bp.route("/<int:payment_id>", methods=["GET"])
@jwt_required()
def get_payment(payment_id):

    try:

        user_id = int(get_jwt_identity())

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
