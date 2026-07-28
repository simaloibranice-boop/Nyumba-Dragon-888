from app import create_app
from app.extensions import db

# Import models so Alembic can detect them
from app.models.user import User
from app.models.service import Service
from app.models.service_request import ServiceRequest

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
