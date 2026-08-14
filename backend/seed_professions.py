from app import create_app
from app.extensions import db
from app.models.profession import Profession


app = create_app()


PROFESSIONS = [

    # ============================================================
    # AUTOMOTIVE & MECHANICAL
    # ============================================================

    ("Mechanic", "Automotive"),
    ("Auto Electrician", "Automotive"),
    ("Motor Vehicle Diagnostic Technician", "Automotive"),
    ("Motorcycle Mechanic", "Automotive"),
    ("Bicycle Mechanic", "Automotive"),
    ("Heavy Vehicle Mechanic", "Automotive"),
    ("Diesel Mechanic", "Automotive"),
    ("Tyre Technician", "Automotive"),
    ("Vehicle Body Repairer", "Automotive"),
    ("Vehicle Painter", "Automotive"),
    ("Car Detailer", "Automotive"),
    ("Vehicle Inspector", "Automotive"),
    ("Auto Parts Dealer", "Automotive"),
    ("Garage Technician", "Automotive"),

    # ============================================================
    # CONSTRUCTION & SKILLED TRADES
    # ============================================================

    ("Electrician", "Construction & Trades"),
    ("Plumber", "Construction & Trades"),
    ("Mason", "Construction & Trades"),
    ("Bricklayer", "Construction & Trades"),
    ("Carpenter", "Construction & Trades"),
    ("Joiner", "Construction & Trades"),
    ("Welder", "Construction & Trades"),
    ("Fabricator", "Construction & Trades"),
    ("Painter", "Construction & Trades"),
    ("Tiler", "Construction & Trades"),
    ("Roofer", "Construction & Trades"),
    ("Glazier", "Construction & Trades"),
    ("Gypsum Installer", "Construction & Trades"),
    ("Ceiling Installer", "Construction & Trades"),
    ("Flooring Installer", "Construction & Trades"),
    ("Concrete Worker", "Construction & Trades"),
    ("Quantity Surveyor", "Construction & Trades"),
    ("Civil Engineer", "Construction & Trades"),
    ("Structural Engineer", "Construction & Trades"),
    ("Architect", "Construction & Trades"),
    ("Land Surveyor", "Construction & Trades"),
    ("Construction Project Manager", "Construction & Trades"),
    ("Building Technician", "Construction & Trades"),

    # ============================================================
    # TECHNOLOGY & SOFTWARE
    # ============================================================

    ("Software Developer", "Technology"),
    ("Frontend Developer", "Technology"),
    ("Backend Developer", "Technology"),
    ("Full Stack Developer", "Technology"),
    ("Mobile App Developer", "Technology"),
    ("React Developer", "Technology"),
    ("Python Developer", "Technology"),
    ("Java Developer", "Technology"),
    ("DevOps Engineer", "Technology"),
    ("Cloud Engineer", "Technology"),
    ("Data Analyst", "Technology"),
    ("Data Scientist", "Technology"),
    ("Database Administrator", "Technology"),
    ("Cybersecurity Specialist", "Technology"),
    ("Network Engineer", "Technology"),
    ("IT Support Specialist", "Technology"),
    ("Systems Administrator", "Technology"),
    ("UI/UX Designer", "Technology"),
    ("Product Designer", "Technology"),
    ("Product Manager", "Technology"),
    ("QA Engineer", "Technology"),
    ("Software Tester", "Technology"),
    ("AI / Machine Learning Engineer", "Technology"),
    ("Technical Writer", "Technology"),
    ("IT Consultant", "Technology"),

    # ============================================================
    # AGRICULTURE & FOOD PRODUCTION
    # ============================================================

    ("Farmer", "Agriculture"),
    ("Vegetable Farmer", "Agriculture"),
    ("Fruit Farmer", "Agriculture"),
    ("Dairy Farmer", "Agriculture"),
    ("Poultry Farmer", "Agriculture"),
    ("Pig Farmer", "Agriculture"),
    ("Fish Farmer", "Agriculture"),
    ("Beekeeper", "Agriculture"),
    ("Agricultural Technician", "Agriculture"),
    ("Agronomist", "Agriculture"),
    ("Agricultural Consultant", "Agriculture"),
    ("Farm Manager", "Agriculture"),
    ("Farm Labourer", "Agriculture"),
    ("Florist", "Agriculture"),
    ("Landscaper", "Agriculture"),
    ("Nursery Operator", "Agriculture"),

    # ============================================================
    # FOOD & HOSPITALITY
    # ============================================================

    ("Chef", "Food & Hospitality"),
    ("Cook", "Food & Hospitality"),
    ("Caterer", "Food & Hospitality"),
    ("Baker", "Food & Hospitality"),
    ("Pastry Chef", "Food & Hospitality"),
    ("Butcher", "Food & Hospitality"),
    ("Barista", "Food & Hospitality"),
    ("Waiter / Waitress", "Food & Hospitality"),
    ("Restaurant Manager", "Food & Hospitality"),
    ("Hotel Manager", "Food & Hospitality"),
    ("Food Vendor", "Food & Hospitality"),
    ("Mama Mboga / Vegetable Vendor", "Food & Hospitality"),
    ("Fruit Vendor", "Food & Hospitality"),
    ("Street Food Vendor", "Food & Hospitality"),
    ("Food Delivery Operator", "Food & Hospitality"),

    # ============================================================
    # BEAUTY & PERSONAL CARE
    # ============================================================

    ("Hairdresser", "Beauty & Personal Care"),
    ("Barber", "Beauty & Personal Care"),
    ("Braider", "Beauty & Personal Care"),
    ("Makeup Artist", "Beauty & Personal Care"),
    ("Nail Technician", "Beauty & Personal Care"),
    ("Beautician", "Beauty & Personal Care"),
    ("Esthetician", "Beauty & Personal Care"),
    ("Massage Therapist", "Beauty & Personal Care"),
    ("Tattoo Artist", "Beauty & Personal Care"),
    ("Beauty Consultant", "Beauty & Personal Care"),

    # ============================================================
    # TRANSPORT & LOGISTICS
    # ============================================================

    ("Driver", "Transport & Logistics"),
    ("Matatu Driver", "Transport & Logistics"),
    ("Taxi Driver", "Transport & Logistics"),
    ("Boda Boda Rider", "Transport & Logistics"),
    ("Tuk Tuk Driver", "Transport & Logistics"),
    ("Truck Driver", "Transport & Logistics"),
    ("Bus Driver", "Transport & Logistics"),
    ("Delivery Rider", "Transport & Logistics"),
    ("Courier", "Transport & Logistics"),
    ("Logistics Coordinator", "Transport & Logistics"),
    ("Warehouse Operator", "Transport & Logistics"),
    ("Forklift Operator", "Transport & Logistics"),
    ("Supply Chain Specialist", "Transport & Logistics"),
    ("Dispatcher", "Transport & Logistics"),

    # ============================================================
    # CREATIVE, MEDIA & ENTERTAINMENT
    # ============================================================

    ("Graphic Designer", "Creative & Media"),
    ("Photographer", "Creative & Media"),
    ("Videographer", "Creative & Media"),
    ("Video Editor", "Creative & Media"),
    ("Film Producer", "Creative & Media"),
    ("Film Director", "Creative & Media"),
    ("Content Creator", "Creative & Media"),
    ("Social Media Manager", "Creative & Media"),
    ("Copywriter", "Creative & Media"),
    ("Writer", "Creative & Media"),
    ("Journalist", "Creative & Media"),
    ("Animator", "Creative & Media"),
    ("Illustrator", "Creative & Media"),
    ("Musician", "Creative & Media"),
    ("DJ", "Creative & Media"),
    ("Event MC", "Creative & Media"),
    ("Dancer", "Creative & Media"),

    # ============================================================
    # HEALTHCARE
    # ============================================================

    ("Nurse", "Healthcare"),
    ("Clinical Officer", "Healthcare"),
    ("Doctor", "Healthcare"),
    ("Dentist", "Healthcare"),
    ("Pharmacist", "Healthcare"),
    ("Pharmacy Technician", "Healthcare"),
    ("Laboratory Technician", "Healthcare"),
    ("Radiographer", "Healthcare"),
    ("Physiotherapist", "Healthcare"),
    ("Nutritionist", "Healthcare"),
    ("Counsellor", "Healthcare"),
    ("Caregiver", "Healthcare"),
    ("Community Health Worker", "Healthcare"),
    ("Occupational Therapist", "Healthcare"),

    # ============================================================
    # EDUCATION
    # ============================================================

    ("Teacher", "Education"),
    ("Primary School Teacher", "Education"),
    ("Secondary School Teacher", "Education"),
    ("University Lecturer", "Education"),
    ("Tutor", "Education"),
    ("Online Tutor", "Education"),
    ("Early Childhood Teacher", "Education"),
    ("Special Needs Teacher", "Education"),
    ("Music Teacher", "Education"),
    ("Computer Instructor", "Education"),
    ("Driving Instructor", "Education"),

    # ============================================================
    # BUSINESS & PROFESSIONAL SERVICES
    # ============================================================

    ("Accountant", "Professional Services"),
    ("Bookkeeper", "Professional Services"),
    ("Auditor", "Professional Services"),
    ("Financial Advisor", "Professional Services"),
    ("Business Consultant", "Professional Services"),
    ("Management Consultant", "Professional Services"),
    ("Lawyer", "Professional Services"),
    ("Legal Assistant", "Professional Services"),
    ("Human Resources Specialist", "Professional Services"),
    ("Recruiter", "Professional Services"),
    ("Project Manager", "Professional Services"),
    ("Business Analyst", "Professional Services"),
    ("Marketing Specialist", "Professional Services"),
    ("Sales Representative", "Professional Services"),
    ("Customer Service Representative", "Professional Services"),
    ("Virtual Assistant", "Professional Services"),
    ("Secretary", "Professional Services"),
    ("Office Administrator", "Professional Services"),

    # ============================================================
    # RETAIL & COMMERCE
    # ============================================================

    ("Shopkeeper", "Retail & Commerce"),
    ("Retail Salesperson", "Retail & Commerce"),
    ("Supermarket Attendant", "Retail & Commerce"),
    ("Cashier", "Retail & Commerce"),
    ("Stock Controller", "Retail & Commerce"),
    ("Merchandiser", "Retail & Commerce"),
    ("Wholesale Trader", "Retail & Commerce"),
    ("Online Seller", "Retail & Commerce"),
    ("Market Trader", "Retail & Commerce"),
    ("M-Pesa Agent", "Retail & Commerce"),
    ("Mobile Phone Dealer", "Retail & Commerce"),
    ("Electronics Dealer", "Retail & Commerce"),

    # ============================================================
    # HOME & DOMESTIC SERVICES
    # ============================================================

    ("Cleaner", "Home Services"),
    ("Housekeeper", "Home Services"),
    ("Gardener", "Home Services"),
    ("Domestic Worker", "Home Services"),
    ("Nanny", "Home Services"),
    ("Pet Care Provider", "Home Services"),
    ("Pest Control Technician", "Home Services"),
    ("Laundry Service Provider", "Home Services"),
    ("Carpet Cleaner", "Home Services"),
    ("Home Appliance Repair Technician", "Home Services"),
    ("Furniture Repairer", "Home Services"),

    # ============================================================
    # SECURITY & SAFETY
    # ============================================================

    ("Security Guard", "Security"),
    ("Security Supervisor", "Security"),
    ("CCTV Technician", "Security"),
    ("Alarm Technician", "Security"),
    ("Access Control Technician", "Security"),
    ("Security Consultant", "Security"),
    ("Private Investigator", "Security"),
    ("Fire Safety Technician", "Security"),

    # ============================================================
    # MANUFACTURING & INDUSTRIAL
    # ============================================================

    ("Machine Operator", "Manufacturing"),
    ("Production Worker", "Manufacturing"),
    ("Factory Technician", "Manufacturing"),
    ("Industrial Electrician", "Manufacturing"),
    ("Industrial Mechanic", "Manufacturing"),
    ("Machine Technician", "Manufacturing"),
    ("Quality Control Inspector", "Manufacturing"),
    ("Packaging Operator", "Manufacturing"),
    ("Production Supervisor", "Manufacturing"),

    # ============================================================
    # ENERGY & ENVIRONMENT
    # ============================================================

    ("Solar Technician", "Energy"),
    ("Solar Installer", "Energy"),
    ("Renewable Energy Technician", "Energy"),
    ("Wind Energy Technician", "Energy"),
    ("Energy Auditor", "Energy"),
    ("Environmental Scientist", "Environment"),
    ("Waste Management Specialist", "Environment"),
    ("Recycling Operator", "Environment"),
    ("Water Treatment Technician", "Environment"),

    # ============================================================
    # REAL ESTATE & PROPERTY
    # ============================================================

    ("Real Estate Agent", "Real Estate"),
    ("Property Manager", "Real Estate"),
    ("Property Valuer", "Real Estate"),
    ("Estate Agent", "Real Estate"),
    ("Caretaker", "Real Estate"),
    ("Facilities Manager", "Real Estate"),
    ("Property Maintenance Technician", "Real Estate"),

    # ============================================================
    # TELECOMMUNICATIONS
    # ============================================================

    ("Telecommunications Technician", "Telecommunications"),
    ("Fiber Optic Technician", "Telecommunications"),
    ("Network Technician", "Telecommunications"),
    ("Internet Installation Technician", "Telecommunications"),
    ("Tower Technician", "Telecommunications"),
    ("Radio Technician", "Telecommunications"),

    # ============================================================
    # EVENTS
    # ============================================================

    ("Event Planner", "Events"),
    ("Event Decorator", "Events"),
    ("Wedding Planner", "Events"),
    ("Event Photographer", "Events"),
    ("Event Caterer", "Events"),
    ("Event Equipment Provider", "Events"),
    ("Florist", "Events"),
    ("Sound Technician", "Events"),
    ("Lighting Technician", "Events"),

    # ============================================================
    # COMMUNITY & DEVELOPMENT
    # ============================================================

    ("Community Health Worker", "Community Services"),
    ("Social Worker", "Community Services"),
    ("Community Organizer", "Community Services"),
    ("NGO Program Officer", "Community Services"),
    ("Project Officer", "Community Services"),
    ("Monitoring & Evaluation Officer", "Community Services"),
    ("Youth Program Coordinator", "Community Services"),
    ("Community Development Officer", "Community Services"),
]


with app.app_context():

    added = 0
    skipped = 0

    print()
    print("=" * 60)
    print("      NYŨMBA DRAGON 888 PROFESSIONAL CATALOGUE")
    print("=" * 60)

    for name, category in PROFESSIONS:

        existing = Profession.query.filter_by(
            name=name
        ).first()

        if existing:
            skipped += 1
            continue

        profession = Profession(
            name=name,
            category=category,
            description=(
                f"Professional {name.lower()} services and "
                f"opportunities in Kenya."
            ),
            active=True
        )

        db.session.add(profession)

        print(
            f"ADDED | {name} | {category}"
        )

        added += 1

    db.session.commit()

    total = Profession.query.count()

    print()
    print("=" * 60)
    print(f"ADDED:   {added}")
    print(f"SKIPPED: {skipped}")
    print(f"TOTAL:   {total}")
    print("=" * 60)
