import os

from dotenv import load_dotenv

load_dotenv()

from flask import Flask
from flask_cors import CORS

from app.extensions import db, jwt, migrate

from app.models.profession import Profession


def create_app():

    app = Flask(__name__)

    # =====================================
    # DATABASE CONFIGURATION
    # =====================================

    database_url = os.getenv("DATABASE_URL")

    if database_url:
        # Compatibility with older PostgreSQL URLs
        if database_url.startswith("postgres://"):
            database_url = database_url.replace(
                "postgres://",
                "postgresql://",
                1
            )

        app.config["SQLALCHEMY_DATABASE_URI"] = database_url

    else:
        # Local development
        app.config["SQLALCHEMY_DATABASE_URI"] = (
            "sqlite:///nyumba_dragon.db"
        )

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # =====================================
    # JWT CONFIGURATION
    # =====================================

    app.config["JWT_SECRET_KEY"] = os.getenv(
        "JWT_SECRET_KEY",
        "dragon-secret-key-change-this-locally"
    )

    # =====================================
    # CORS CONFIGURATION
    # =====================================

    frontend_url = os.getenv(
        "FRONTEND_URL",
        "https://nyumbadragon888.netlify.app"
    )

    allowed_origins = [
        origin.strip()
        for origin in frontend_url.split(",")
        if origin.strip()
    ]

    # Always allow local Vite frontend during development
    if "http://localhost:5173" not in allowed_origins:
        allowed_origins.append("http://localhost:5173")

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": allowed_origins,
                "methods": [
                    "GET",
                    "POST",
                    "PUT",
                    "PATCH",
                    "DELETE",
                    "OPTIONS"
                ],
                "allow_headers": [
                    "Content-Type",
                    "Authorization"
                ],
                "supports_credentials": True
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
    # REGISTER BLUEPRINTS
    # =====================================

    from app.routes.auth import auth_bp
    from app.routes.client import client_bp
    from app.routes.technician import technician_bp
    from app.routes.payment import payment_bp
    from app.routes.wallet import wallet_bp
    from app.routes.profession import profession_bp

    app.register_blueprint(auth_bp)
    app.register_blueprint(client_bp)
    app.register_blueprint(technician_bp)
    app.register_blueprint(payment_bp)
    app.register_blueprint(wallet_bp)
    app.register_blueprint(profession_bp)

    # =====================================
    # ENSURE DEFAULT SERVICES
    # =====================================
    #
    # This runs against whichever database
    # the application is connected to.
    #
    # Locally:
    #     SQLite
    #
    # Render:
    #     DATABASE_URL
    #
    # Therefore we don't need Render Shell
    # to populate the production services.
    # =====================================

    with app.app_context():

        try:

            # Import here to avoid circular imports
            from app.services.service_seed import ensure_services

            added_services = ensure_services()

            if added_services:

                print(
                    f"DEFAULT SERVICES: "
                    f"added {added_services} service(s)"
                )

            else:

                print(
                    "DEFAULT SERVICES: "
                    "all services already exist"
                )

        except Exception as e:

            db.session.rollback()

            print(
                "DEFAULT SERVICES SEED FAILED:",
                str(e)
            )

    # =====================================
    # HEALTH CHECK
    # =====================================

    @app.route("/api/health", methods=["GET"])
    def health():

        return {
            "status": "ok",
            "message": "Nyũmba Dragon 888 API is running"
        }, 200

    return app
