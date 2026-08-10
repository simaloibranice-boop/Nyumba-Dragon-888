from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from werkzeug.security import generate_password_hash, check_password_hash

from app.extensions import db
from app.models.user import User


auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)


def normalize_phone(phone):
    """
    Converts Kenyan phone numbers into international format.

    0712345678
    +254712345678
    254712345678

    becomes:

    254712345678
    """

    if not phone:
        return None

    phone = (
        str(phone)
        .replace(" ", "")
        .replace("-", "")
    )

    if phone.startswith("+"):
        phone = phone[1:]

    if phone.startswith("0"):
        phone = "254" + phone[1:]

    return phone


def user_response(user):
    """
    Return the authenticated user's public information.
    Never return the password.
    """

    return user.to_dict()


# ==========================================
# REGISTER
# ==========================================

@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json() or {}

    full_name = data.get("full_name")
    email = data.get("email")
    age = data.get("age")
    phone = normalize_phone(data.get("phone"))
    password = data.get("password")

    role = str(
        data.get("role", "CLIENT")
    ).upper()

    if role not in [
        "CLIENT",
        "TECHNICIAN"
    ]:
        role = "CLIENT"

    if not all([
        full_name,
        email,
        age,
        phone,
        password
    ]):
        return jsonify({
            "message": "All fields are required"
        }), 400

    try:
        age = int(age)
    except (TypeError, ValueError):

        return jsonify({
            "message": "Age must be a valid number"
        }), 400

    if age < 13 or age > 100:

        return jsonify({
            "message": "Age must be between 13 and 100"
        }), 400

    existing = User.query.filter(
        (User.email == email) |
        (User.phone == phone)
    ).first()

    if existing:

        return jsonify({
            "message": "Email or phone already registered"
        }), 409

    user = User(
        full_name=full_name.strip(),
        email=email.strip().lower(),
        age=age,
        phone=phone,
        password=generate_password_hash(password),
        role=role
    )

    db.session.add(user)
    db.session.commit()

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({

        "message": "Account created successfully",

        "token": token,

        "user": user_response(user)

    }), 201


# ==========================================
# LOGIN
# ==========================================

@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json() or {}

    phone = normalize_phone(
        data.get("phone")
    )

    password = data.get("password")

    if not phone or not password:

        return jsonify({
            "message": "Phone and password required"
        }), 400

    user = User.query.filter_by(
        phone=phone
    ).first()

    if not user:

        return jsonify({
            "message": "Invalid credentials"
        }), 401

    if not check_password_hash(
        user.password,
        password
    ):

        return jsonify({
            "message": "Invalid credentials"
        }), 401

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({

        "message": "Login successful",

        "token": token,

        "user": user_response(user)

    }), 200


# ==========================================
# GET CURRENT USER PROFILE
# ==========================================

@auth_bp.route("/profile", methods=["GET"])
@jwt_required()
def get_profile():

    identity = get_jwt_identity()

    try:
        user_id = int(identity)
    except (TypeError, ValueError):

        return jsonify({
            "message": "Invalid user identity"
        }), 401

    user = db.session.get(
        User,
        user_id
    )

    if not user:

        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({

        "message": "Profile retrieved successfully",

        "user": user_response(user)

    }), 200


# ==========================================
# UPDATE CURRENT USER PROFILE
# ==========================================

@auth_bp.route("/profile", methods=["PUT"])
@jwt_required()
def update_profile():

    identity = get_jwt_identity()

    try:
        user_id = int(identity)
    except (TypeError, ValueError):

        return jsonify({
            "message": "Invalid user identity"
        }), 401

    user = db.session.get(
        User,
        user_id
    )

    if not user:

        return jsonify({
            "message": "User not found"
        }), 404

    data = request.get_json() or {}

    full_name = data.get("full_name")
    email = data.get("email")
    phone = data.get("phone")

    # --------------------------------------
    # FULL NAME
    # --------------------------------------

    if full_name is not None:

        full_name = str(full_name).strip()

        if not full_name:

            return jsonify({
                "message": "Full name cannot be empty"
            }), 400

        user.full_name = full_name

    # --------------------------------------
    # EMAIL
    # --------------------------------------

    if email is not None:

        email = str(email).strip().lower()

        if not email:

            return jsonify({
                "message": "Email cannot be empty"
            }), 400

        existing_email = User.query.filter(
            User.email == email,
            User.id != user.id
        ).first()

        if existing_email:

            return jsonify({
                "message": "Email already registered"
            }), 409

        user.email = email

    # --------------------------------------
    # PHONE
    # --------------------------------------

    if phone is not None:

        phone = normalize_phone(phone)

        if not phone:

            return jsonify({
                "message": "Phone number cannot be empty"
            }), 400

        existing_phone = User.query.filter(
            User.phone == phone,
            User.id != user.id
        ).first()

        if existing_phone:

            return jsonify({
                "message": "Phone number already registered"
            }), 409

        user.phone = phone

    db.session.commit()

    return jsonify({

        "message": "Profile updated successfully",

        "user": user_response(user)

    }), 200


# ==========================================
# CHANGE PASSWORD
# ==========================================

@auth_bp.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():

    identity = get_jwt_identity()

    try:
        user_id = int(identity)
    except (TypeError, ValueError):

        return jsonify({
            "message": "Invalid user identity"
        }), 401

    user = db.session.get(
        User,
        user_id
    )

    if not user:

        return jsonify({
            "message": "User not found"
        }), 404

    data = request.get_json() or {}

    current_password = data.get(
        "current_password"
    )

    new_password = data.get(
        "new_password"
    )

    if not current_password or not new_password:

        return jsonify({
            "message": "Current password and new password are required"
        }), 400

    if len(new_password) < 8:

        return jsonify({
            "message": "New password must be at least 8 characters"
        }), 400

    if not check_password_hash(
        user.password,
        current_password
    ):

        return jsonify({
            "message": "Current password is incorrect"
        }), 401

    user.password = generate_password_hash(
        new_password
    )

    db.session.commit()

    return jsonify({

        "message": "Password changed successfully"

    }), 200
