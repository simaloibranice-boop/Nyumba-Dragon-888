from app import create_app
from app.extensions import db
from app.models.service import Service

app = create_app()

services = [
    {
        "name": "Electrical Installation",
        "category": "Electrical",
        "description": "Professional electrical installation and maintenance."
    },
    {
        "name": "Plumbing",
        "category": "Plumbing",
        "description": "Residential and commercial plumbing services."
    },
    {
        "name": "Cleaning",
        "category": "Cleaning",
        "description": "Home and office cleaning services."
    },
    {
        "name": "Painting",
        "category": "Painting",
        "description": "Interior and exterior painting."
    },
    {
        "name": "Carpentry",
        "category": "Carpentry",
        "description": "Custom woodwork and repairs."
    },
    {
        "name": "Security Systems",
        "category": "Security",
        "description": "CCTV, alarm systems, and access control."
    },
    {
        "name": "Internet Installation",
        "category": "Networking",
        "description": "Home and business internet installation."
    }
]

with app.app_context():

    for item in services:

        existing = Service.query.filter_by(
            name=item["name"]
        ).first()

        if not existing:
            db.session.add(Service(**item))

    db.session.commit()

    print("✅ Services seeded successfully.")
