from datetime import datetime

from flask import Blueprint, request, jsonify

from flask_jwt_extended import create_access_token

from app.extensions import db

from app.models.user import User

from app.utils.security import (
    hash_password,
    verify_password
)



auth = Blueprint(
    "auth",
    __name__
)



@auth.route(
    "/register",
    methods=["POST"]
)
def register():


    data = request.get_json()



    existing_email = User.query.filter_by(
        email=data["email"]
    ).first()



    if existing_email:

        return jsonify({

            "error":
            "Email already exists"

        }),400




    existing_username = User.query.filter_by(
        username=data["username"]
    ).first()



    if existing_username:

        return jsonify({

            "error":
            "Username already exists"

        }),400





    user = User(

        name=data["full_name"],

        username=data["username"],

        email=data["email"],

        phone=data.get("phone"),

        age=data.get("age"),

        password=hash_password(
            data["password"]
        ),

        role=data.get(
            "role",
            "CLIENT"
        )

    )



    db.session.add(user)

    db.session.commit()



    token = create_access_token(

        identity=str(user.id),

        additional_claims={

            "role":user.role

        }

    )



    return jsonify({

        "message":
        "Dragon account created",


        "token":
        token,


        "user":{

            "id":user.id,

            "name":user.name,

            "username":user.username,

            "email":user.email,

            "phone":user.phone,

            "age":user.age,

            "role":user.role

        }

    }),201








@auth.route(
    "/login",
    methods=["POST"]
)
def login():


    data=request.get_json()



    user=None



    if data.get("username"):

        user=User.query.filter_by(

            username=data["username"]

        ).first()



    elif data.get("email"):

        user=User.query.filter_by(

            email=data["email"]

        ).first()



    if not user:


        return jsonify({

            "error":
            "Invalid credentials"

        }),401





    if not verify_password(

        user.password,

        data["password"]

    ):


        return jsonify({

            "error":
            "Invalid credentials"

        }),401




    user.last_login=datetime.utcnow()

    db.session.commit()





    token=create_access_token(

        identity=str(user.id),

        additional_claims={

            "role":user.role

        }

    )




    return jsonify({

        "token":token,


        "user":{

            "id":user.id,

            "name":user.name,

            "username":user.username,

            "email":user.email,

            "phone":user.phone,

            "age":user.age,

            "role":user.role

        }

    }),200
