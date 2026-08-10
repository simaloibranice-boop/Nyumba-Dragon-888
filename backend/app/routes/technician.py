from flask import Blueprint, jsonify, request

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from app import db

from app.models.service_request import ServiceRequest
from app.models.technician_profile import TechnicianProfile



technician_bp = Blueprint(
    "technician",
    __name__,
    url_prefix="/api/technician"
)





@technician_bp.route(
    "/jobs",
    methods=["GET"]
)
@jwt_required()
def get_jobs():
    from flask import request

    print("\n========== TECHNICIAN JOBS ==========")
    print("Authorization:", request.headers.get("Authorization"))
    print("Headers:", dict(request.headers))

    jobs = ServiceRequest.query.all()


    return jsonify([

        {

            "id": job.id,

            "service":
                job.title,

            "customer":
                job.customer.username
                if job.customer
                else "Unknown",

            "location":
                job.location,

            "description":
                job.description,

            "labour":
                "Inspection, repair, installation and testing",

            "price":
                job.price
                if hasattr(job,"price")
                else 0,

            "status":
                job.status

        }

        for job in jobs

    ])







@technician_bp.route(
    "/profile",
    methods=["GET"]
)
@jwt_required()
def get_profile():

    from flask import request

    print("\n========== TECHNICIAN PROFILE ==========")
    print("Authorization:", request.headers.get("Authorization"))
    print("Headers:", dict(request.headers))

    user_id = get_jwt_identity()


    profile = TechnicianProfile.query.filter_by(
        user_id=user_id
    ).first()



    if not profile:


        profile = TechnicianProfile(

            user_id=user_id,

            specialization="General Technician",

            location="Not Assigned",

            availability="AVAILABLE",

            rating=5.0,

            completed_jobs=0

        )


        db.session.add(profile)

        db.session.commit()



    return jsonify(
        profile.to_dict()
    )







@technician_bp.route(
    "/status",
    methods=["PUT"]
)
@jwt_required()
def update_status():


    user_id = get_jwt_identity()


    profile = TechnicianProfile.query.filter_by(
        user_id=user_id
    ).first()



    if not profile:

        return jsonify({

            "message":
            "Technician profile not found"

        }),404




    data = request.get_json()



    new_status = data.get(
        "availability"
    )



    allowed_status = [

        "AVAILABLE",
        "BUSY",
        "OFFLINE"

    ]



    if new_status not in allowed_status:


        return jsonify({

            "message":
            "Invalid availability status"

        }),400





    profile.availability = new_status


    db.session.commit()



    return jsonify({

        "message":
        "Availability updated",

        "availability":
        profile.availability

    })









@technician_bp.route(
    "/jobs/<int:id>/accept",
    methods=["PUT"]
)
@jwt_required()
def accept_job(id):


    job = ServiceRequest.query.get_or_404(id)


    job.status = "ACCEPTED"


    job.technician_id = get_jwt_identity()


    db.session.commit()



    return jsonify({

        "message":
        "Job accepted successfully"

    })









@technician_bp.route(
    "/jobs/<int:id>/complete",
    methods=["PUT"]
)
@jwt_required()
def complete_job(id):

    user_id = int(get_jwt_identity())

    job = ServiceRequest.query.get_or_404(id)

    # Only the assigned technician can complete the job
    if job.technician_id != user_id:

        return jsonify({
            "message": "You are not assigned to this job"
        }), 403

    # Prevent completing an already completed job
    if job.status == "COMPLETED":

        return jsonify({
            "message": "This job is already completed"
        }), 409

    job.status = "COMPLETED"

    db.session.commit()

    return jsonify({
        "message": "Job completed successfully",
        "job": job.to_dict()
    }), 200


@technician_bp.route(
    "/earnings",
    methods=["GET"]
)
@jwt_required()
def get_earnings():

    user_id = int(get_jwt_identity())

    from app.models.wallet import Wallet

    wallet = Wallet.query.filter_by(
        user_id=user_id
    ).first()

    if not wallet:

        return jsonify({
            "balance": 0.0,
            "pending_balance": 0.0,
            "currency": "KES",
            "completed_jobs": ServiceRequest.query.filter_by(
                technician_id=user_id,
                status="COMPLETED"
            ).count()
        }), 200

    completed_jobs = ServiceRequest.query.filter_by(
        technician_id=user_id,
        status="COMPLETED"
    ).count()

    return jsonify({
        "balance": float(wallet.balance or 0.0),
        "pending_balance": float(
            wallet.pending_balance or 0.0
        ),
        "currency": wallet.currency,
        "completed_jobs": completed_jobs
    }), 200


@technician_bp.route(
    "/performance",
    methods=["GET"]
)
@jwt_required()
def get_performance():


    user_id = get_jwt_identity()



    completed_jobs = ServiceRequest.query.filter_by(
        technician_id=user_id,
        status="COMPLETED"
    ).count()



    accepted_jobs = ServiceRequest.query.filter_by(
        technician_id=user_id,
        status="ACCEPTED"
    ).count()



    total_jobs = completed_jobs + accepted_jobs



    if total_jobs == 0:

        reliability = 100

    else:

        reliability = round(
            (completed_jobs / total_jobs) * 100,
            2
        )




    profile = TechnicianProfile.query.filter_by(
        user_id=user_id
    ).first()



    return jsonify({

        "rating":
            profile.rating
            if profile
            else 5.0,


        "completed_jobs":
            completed_jobs,


        "active_jobs":
            accepted_jobs,


        "reliability_score":
            reliability,


        "service_area":
            profile.location
            if profile
            else "Not Assigned"

    })

