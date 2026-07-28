from flask import Blueprint, jsonify

from app.utils.permissions import role_required


admin = Blueprint(
    "admin",
    __name__
)


@admin.route(
    "/dashboard",
    methods=["GET"]
)
@role_required(
    "SUPER_ADMIN",
    "DIRECTOR"
)
def dashboard():

    return jsonify({
        "message": "Welcome to Dragon Command Center",
        "platform": "Nyumba Dragon 888",
        "security": "Authorized"
    })
