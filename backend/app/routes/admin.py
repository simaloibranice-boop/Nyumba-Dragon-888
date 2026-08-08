from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.utils.permissions import role_required

admin_bp = Blueprint(
    "admin",
    __name__,
    url_prefix="/api/admin"
)


@admin_bp.route(
    "/dashboard",
    methods=["GET"]
)
@jwt_required()
@role_required(
    "SUPER_ADMIN",
    "DIRECTOR"
)
def dashboard():

    return jsonify({

        "message": "Welcome to Dragon Command Center",

        "platform": "Nyumba Dragon 888",

        "security": "Authorized"

    }), 200
