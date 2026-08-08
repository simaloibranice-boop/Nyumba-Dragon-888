from app import create_app
from app.extensions import db
from app.models.service import Service


app = create_app()


SERVICES = [
    {
        "name": "Electrical Installation",
        "category": "Electrical",
        "description": (
            "Professional electrical installation, wiring, "
            "repairs, maintenance and electrical system upgrades."
        )
    },
    {
        "name": "Plumbing",
        "category": "Plumbing",
        "description": (
            "Reliable plumbing installation, pipe repairs, "
            "leak detection, drainage and maintenance services."
        )
    },
    {
        "name": "Construction",
        "category": "Construction",
        "description": (
            "Professional construction, masonry, renovations, "
            "building and general construction services."
        )
    },
    {
        "name": "Security Systems",
        "category": "Security",
        "description": (
            "Installation and maintenance of CCTV cameras, "
            "alarms, access control and other security systems."
        )
    },
    {
        "name": "Solar Installation",
        "category": "Solar",
        "description": (
            "Solar panel installation, maintenance and "
            "renewable energy solutions for homes and businesses."
        )
    },
    {
        "name": "Carpentry",
        "category": "Carpentry",
        "description": (
            "Professional carpentry, furniture making, "
            "woodwork, repairs and custom installations."
        )
    },
    {
        "name": "Painting",
        "category": "Painting",
        "description": (
            "Interior and exterior painting, wall finishing "
            "and professional decoration services."
        )
    },
    {
        "name": "Cleaning",
        "category": "Cleaning",
        "description": (
            "Professional residential and commercial cleaning "
            "services for homes, offices and other spaces."
        )
    }
]


with app.app_context():

    print()
    print("========================================")
    print("     NYUMBA DRAGON 888 SERVICE SEED")
    print("========================================")
    print()

    added = 0
    skipped = 0

    for data in SERVICES:

        existing = Service.query.filter_by(
            name=data["name"]
        ).first()

        if existing:

            print(
                f"SKIPPED  | "
                f"{existing.name}"
            )

            skipped += 1
            continue

        service = Service(
            name=data["name"],
            category=data["category"],
            description=data["description"],
            active=True
        )

        db.session.add(service)

        print(
            f"ADDED    | "
            f"{data['name']} | "
            f"{data['category']}"
        )

        added += 1

    db.session.commit()

    print()
    print("========================================")
    print("             SEED COMPLETE")
    print("========================================")
    print(f"Added:   {added}")
    print(f"Skipped: {skipped}")
    print(f"Total:   {Service.query.count()}")
    print()
