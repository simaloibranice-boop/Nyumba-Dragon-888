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
    Converts phone numbers into international format.

    0712345678
    +254712345678
    254712345678

    becomes:

    254712345678
    """

    if not phone:
        return None

    phone = (
        phone
        .replace(" ", "")
        .replace("-", "")
    )

    if phone.startswith("+"):
        phone = phone[1:]

    if phone.startswith("0"):
        phone = "254" + phone[1:]

    return phone



@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json() or {}


    full_name = data.get("full_name")
    email = data.get("email")
    age = data.get("age")
    phone = normalize_phone(
        data.get("phone")
    )
    password = data.get("password")

    role = data.get(
        "role",
        "CLIENT"
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



    existing = User.query.filter(
        (User.email == email) |
        (User.phone == phone)
    ).first()



    if existing:

        return jsonify({
            "message": "Email or phone already registered"
        }), 409



    user = User(

        full_name=full_name,

        email=email,

        age=int(age),

        phone=phone,

        password=generate_password_hash(
            password
        ),

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

        "user": user.to_dict()

    }), 201





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

        "user": user.to_dict()

    }), 200
