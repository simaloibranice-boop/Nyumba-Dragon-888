from flask import Blueprint, request, jsonify

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from app.extensions import db
from app.models.user import User
from app.utils.security import hash_password, check_password


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)


@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def current_user():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "message": "User not found"
        }), 404


    return jsonify({

        "id": user.id,
        "name": user.name,
        "username": user.username,
        "email": user.email,
        "phone": user.phone,
        "age": user.age,
        "role": user.role,
        "status": user.status,
        "profile_image": user.profile_image

    }), 200
