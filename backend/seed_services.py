from app import create_app
from app.extensions import db
from app.models.service import Service
from app.models.profession import Profession


app = create_app()


SERVICES = [
    {
        "name": "Electrical Installation",
        "category": "Electrical",
        "description": (
            "Professional electrical installation, wiring, "
            "repairs, maintenance and electrical system upgrades."
        ),
        "profession": "Electrician",
    },
    {
        "name": "Plumbing",
        "category": "Plumbing",
        "description": (
            "Reliable plumbing installation, pipe repairs, "
            "leak detection, drainage and maintenance services."
        ),
        "profession": "Plumber",
    },
    {
        "name": "Construction",
        "category": "Construction",
        "description": (
            "Professional construction, masonry, renovations, "
            "building and general construction services."
        ),
        "profession": "Mason",
    },
    {
        "name": "Security Systems",
        "category": "Security",
        "description": (
            "Installation and maintenance of CCTV cameras, "
            "alarms, access control and other security systems."
        ),
        "profession": "CCTV Technician",
    },
    {
        "name": "Solar Installation",
        "category": "Solar",
        "description": (
            "Solar panel installation, maintenance and "
            "renewable energy solutions for homes and businesses."
        ),
        "profession": "Solar Installer",
    },
    {
        "name": "Carpentry",
        "category": "Carpentry",
        "description": (
            "Professional carpentry, furniture making, "
            "woodwork, repairs and custom installations."
        ),
        "profession": "Carpenter",
    },
    {
        "name": "Painting",
        "category": "Painting",
        "description": (
            "Interior and exterior painting, wall finishing "
            "and professional decoration services."
        ),
        "profession": "Painter",
    },
    {
        "name": "Cleaning",
        "category": "Cleaning",
        "description": (
            "Professional residential and commercial cleaning "
            "services for homes, offices and other spaces."
        ),
        "profession": "Cleaner",
    },
]


with app.app_context():

    print()
    print("=" * 70)
    print("      NYŨMBA DRAGON 888 SERVICE + PROFESSION SEED")
    print("=" * 70)
    print()

    added = 0
    updated = 0
    unchanged = 0

    for data in SERVICES:

        profession = Profession.query.filter_by(
            name=data["profession"],
            active=True
        ).first()

        if not profession:
            print(
                f"ERROR | Profession not found: "
                f"{data['profession']}"
            )
            continue

        service = Service.query.filter_by(
            name=data["name"]
        ).first()

        if service is None:

            service = Service(
                name=data["name"],
                category=data["category"],
                profession_id=profession.id,
                description=data["description"],
                active=True
            )

            db.session.add(service)
            added += 1

            print(
                f"ADDED   | {data['name']:<25} "
                f"→ {profession.name}"
            )

        else:

            changed = False

            if service.category != data["category"]:
                service.category = data["category"]
                changed = True

            if service.description != data["description"]:
                service.description = data["description"]
                changed = True

            if service.active is not True:
                service.active = True
                changed = True

            if service.profession_id != profession.id:
                service.profession_id = profession.id
                changed = True

            if changed:
                updated += 1

                print(
                    f"UPDATED | {data['name']:<25} "
                    f"→ {profession.name}"
                )
            else:
                unchanged += 1

                print(
                    f"OK      | {data['name']:<25} "
                    f"→ {profession.name}"
                )

    db.session.commit()

    print()
    print("=" * 70)
    print(f"ADDED:       {added}")
    print(f"UPDATED:     {updated}")
    print(f"UNCHANGED:   {unchanged}")
    print(f"TOTAL:       {Service.query.count()}")
    print("=" * 70)
