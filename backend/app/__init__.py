from flask import Flask
from flask_cors import CORS

from app.extensions import db, jwt, migrate


def create_app():

    app = Flask(__name__)

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///nyumba_dragon.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["JWT_SECRET_KEY"] = "dragon-secret-key-change-this-later"

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": "*"
            }
        }
    )

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    from app.routes.auth import auth_bp
    from app.routes.client import client_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(client_bp)

    @jwt.invalid_token_loader
    def invalid_token(reason):
        print("INVALID TOKEN:", reason)
        return {"msg": reason}, 401

    @jwt.unauthorized_loader
    def missing_token(reason):
        print("MISSING TOKEN:", reason)
        return {"msg": reason}, 401

    return app
