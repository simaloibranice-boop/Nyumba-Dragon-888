from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.extensions import db
from app.models.service import Service
from app.models.service_request import ServiceRequest
import traceback

client_bp = Blueprint(
    "client",
    __name__,
    url_prefix="/api/client"
)


# =====================================
# GET SERVICES
# =====================================

@client_bp.route("/services", methods=["GET"])
@jwt_required()
def get_services():

    services = Service.query.order_by(
        Service.name.asc()
    ).all()

    return jsonify(
        [
            service.to_dict()
            for service in services
        ]
    ), 200


# =====================================
# CREATE SERVICE REQUEST
# =====================================

@client_bp.route("/requests", methods=["POST"])
@jwt_required()
def create_request():

    try:

        user_id = int(get_jwt_identity())

        data = request.get_json()

        print("\n==============================")
        print("NEW SERVICE REQUEST")
        print("==============================")
        print("JWT USER:", user_id)
        print("REQUEST DATA:", data)

        service_id = data.get("service_id")
        title = data.get("title")
        description = data.get("description")
        location = data.get("location")

        if not all([
            service_id,
            title,
            description,
            location
        ]):

            return jsonify({
                "message": "All fields are required"
            }), 400

        service = Service.query.get(service_id)

        if service is None:

            return jsonify({
                "message": "Service not found"
            }), 404

        new_request = ServiceRequest(
            title=title,
            description=description,
            location=location,
            customer_id=user_id,
            service_id=service_id
        )

        db.session.add(new_request)
        db.session.commit()

        print("SERVICE REQUEST CREATED SUCCESSFULLY")
        print("==============================\n")

        return jsonify({
            "message": "Service request created",
            "request": new_request.to_dict()
        }), 201

    except Exception as e:

        db.session.rollback()

        print("\n========== BACKEND ERROR ==========")
        traceback.print_exc()
        print("===================================\n")

        return jsonify({
            "message": str(e),
            "type": type(e).__name__
        }), 500


# =====================================
# CLIENT REQUEST HISTORY
# =====================================

@client_bp.route("/requests", methods=["GET"])
@jwt_required()
def get_requests():

    user_id = int(get_jwt_identity())

    requests = ServiceRequest.query.filter_by(
        customer_id=user_id
    ).order_by(
        ServiceRequest.created_at.desc()
    ).all()

    return jsonify(
        [
            item.to_dict()
            for item in requests
        ]
    ), 200
