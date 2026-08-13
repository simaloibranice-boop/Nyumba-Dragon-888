from app.extensions import db
from app.models.service import Service


SERVICES = [
    {
        "name": "Electrical Installation",
        "category": "Electrical",
        "description": (
            "Professional electrical installation, wiring, "
            "repairs, maintenance and electrical system upgrades."
        ),
    },
    {
        "name": "Plumbing",
        "category": "Plumbing",
        "description": (
            "Reliable plumbing installation, pipe repairs, "
            "leak detection, drainage and maintenance services."
        ),
    },
    {
        "name": "Construction",
        "category": "Construction",
        "description": (
            "Professional construction, masonry, renovations, "
            "building and general construction services."
        ),
    },
    {
        "name": "Security Systems",
        "category": "Security",
        "description": (
            "Installation and maintenance of CCTV cameras, "
            "alarms, access control and other security systems."
        ),
    },
    {
        "name": "Solar Installation",
        "category": "Solar",
        "description": (
            "Solar panel installation, maintenance and "
            "renewable energy solutions for homes and businesses."
        ),
    },
    {
        "name": "Carpentry",
        "category": "Carpentry",
        "description": (
            "Professional carpentry, furniture making, "
            "woodwork, repairs and custom installations."
        ),
    },
    {
        "name": "Painting",
        "category": "Painting",
        "description": (
            "Interior and exterior painting, wall finishing "
            "and professional decoration services."
        ),
    },
    {
        "name": "Cleaning",
        "category": "Cleaning",
        "description": (
            "Professional residential and commercial cleaning "
            "services for homes, offices and other spaces."
        ),
    },
]


def ensure_services():
    """
    Ensure all default Nyũmba Dragon 888 services exist.

    Returns:
        int: Number of newly-created services.
    """

    added = 0

    for data in SERVICES:
        existing = Service.query.filter_by(
            name=data["name"]
        ).first()

        if existing:
            continue

        service = Service(
            name=data["name"],
            category=data["category"],
            description=data["description"],
            active=True,
        )

        db.session.add(service)
        added += 1

    if added:
        db.session.commit()

    return added
