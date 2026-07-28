from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
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
    Converts Kenyan phone numbers to one format.

    0712345678
    +254712345678
    254712345678

    all become

    254712345678
    """

    if not phone:
        return None

    phone = phone.replace(" ", "").replace("-", "")

    if phone.startswith("+254"):
        phone = phone[1:]

    elif phone.startswith("0"):
        phone = "254" + phone[1:]

    return phone


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    phone = normalize_phone(data.get("phone"))
    password = data.get("password")

    if not username or not phone or not password:

        return jsonify({
            "message": "Missing required fields"
        }), 400

    existing_user = User.query.filter(
        (User.username == username) |
        (User.phone == phone)
    ).first()

    if existing_user:

        return jsonify({
            "message": "Account already exists"
        }), 409

    user = User(
        username=username,
        email=email,
        phone=phone,
        password=generate_password_hash(password)
    )

    db.session.add(user)
    db.session.commit()

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({

        "message": "Dragon account created",

        "token": token,

        "user": {

            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "role": user.role

        }

    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    phone = normalize_phone(data.get("phone"))
    password = data.get("password")

    print("\n========== LOGIN ==========")
    print("Username:", username)
    print("Email:", email)
    print("Phone:", phone)

    user = None

    if username:

        user = User.query.filter_by(
            username=username
        ).first()

    if not user and email:

        user = User.query.filter_by(
            email=email
        ).first()

    if not user and phone:

        user = User.query.filter_by(
            phone=phone
        ).first()

    if not user:

        print("User not found")

        return jsonify({
            "message": "Invalid credentials"
        }), 401

    print("User Found:", user.username)
    print("Stored Role:", user.role)

    password_ok = check_password_hash(
        user.password,
        password
    )

    print("Password Correct:", password_ok)

    if not password_ok:

        return jsonify({
            "message": "Invalid credentials"
        }), 401

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({

        "message": "Login successful",

        "token": token,

        "user": {

            "id": user.id,
            "username": user.username,
            "email": user.email,
            "phone": user.phone,
            "role": user.role

        }

    }), 200
