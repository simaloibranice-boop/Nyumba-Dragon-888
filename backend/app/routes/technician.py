from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app import db

from app.models.service_request import ServiceRequest


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
    "/jobs/<int:id>/accept",
    methods=["PUT"]
)
@jwt_required()
def accept_job(id):


    job = ServiceRequest.query.get_or_404(id)


    job.status="ACCEPTED"


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


    job = ServiceRequest.query.get_or_404(id)


    job.status="COMPLETED"


    db.session.commit()



    return jsonify({

        "message":
        "Job completed successfully"

    })
