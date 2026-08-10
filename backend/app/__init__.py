from dotenv import load_dotenv

load_dotenv()

from flask import Flask, request
from flask_cors import CORS

from app.extensions import db, jwt, migrate


def create_app():

    app = Flask(__name__)

    # =====================================
    # DATABASE CONFIGURATION
    # =====================================

    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///nyumba_dragon.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # =====================================
    # JWT CONFIGURATION
    # =====================================

    app.config["JWT_SECRET_KEY"] = "dragon-secret-key-change-this-later"

    # =====================================
    # CORS CONFIGURATION
    # =====================================

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": "*"
            }
        }
    )

    # =====================================
    # INITIALIZE EXTENSIONS
    # =====================================

    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

    # =====================================
    # DEBUG REQUEST HEADERS
    # =====================================

    @app.before_request
    def debug_headers():

        print("\n========== BEFORE REQUEST ==========")
        print("METHOD:", request.method)
        print("PATH:", request.path)
        print(
            "Authorization:",
            request.headers.get("Authorization")
        )

    # =====================================
    # IMPORT BLUEPRINTS
    # =====================================

    from app.routes.auth import auth_bp
    from app.routes.client import client_bp
    from app.routes.technician import technician_bp
    from app.routes.admin import admin_bp
    from app.routes.payment import payment_bp
    from app.routes.wallet import wallet_bp

    # =====================================
    # REGISTER BLUEPRINTS
    # =====================================

    app.register_blueprint(auth_bp)
    app.register_blueprint(client_bp)
    app.register_blueprint(technician_bp)
    app.register_blueprint(admin_bp)
    app.register_blueprint(payment_bp)
    app.register_blueprint(wallet_bp)

    # =====================================
    # JWT ERROR HANDLERS
    # =====================================

    @jwt.invalid_token_loader
    def invalid_token(reason):

        print("\n========== INVALID TOKEN ==========")
        print(reason)

        return {
            "message": reason
        }, 401

    @jwt.unauthorized_loader
    def unauthorized(reason):

        print("\n========== UNAUTHORIZED ==========")
        print(reason)

        return {
            "message": reason
        }, 401

    @jwt.expired_token_loader
    def expired(jwt_header, jwt_payload):

        print("\n========== TOKEN EXPIRED ==========")
        print(jwt_payload)

        return {
            "message": "Token expired"
        }, 401

    @jwt.needs_fresh_token_loader
    def needs_fresh(jwt_header, jwt_payload):

        print("\n========== NEEDS FRESH TOKEN ==========")
        print(jwt_payload)

        return {
            "message": "Fresh token required"
        }, 401

    @jwt.revoked_token_loader
    def revoked(jwt_header, jwt_payload):

        print("\n========== TOKEN REVOKED ==========")
        print(jwt_payload)

        return {
            "message": "Token revoked"
        }, 401

    @jwt.token_verification_failed_loader
    def verification_failed(jwt_header, jwt_payload):

        print("\n========== TOKEN VERIFICATION FAILED ==========")
        print("Header:", jwt_header)
        print("Payload:", jwt_payload)

        return {
            "message": "Token verification failed"
        }, 401

    # =====================================
    # RETURN APPLICATION
    # =====================================

    return app
