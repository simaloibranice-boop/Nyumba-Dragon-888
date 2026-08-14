from datetime import datetime

from app.extensions import db
from app.models.profession import Profession


class TechnicianProfile(db.Model):

    __tablename__ = "technician_profiles"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False,
        unique=True
    )


    profession_id = db.Column(
        db.Integer,
        db.ForeignKey("professions.id"),
        nullable=True
    )


    specialization = db.Column(
        db.String(120),
        nullable=False,
        default="General Technician"
    )


    location = db.Column(
        db.String(120),
        nullable=True
    )


    availability = db.Column(
        db.String(50),
        nullable=False,
        default="AVAILABLE"
    )


    rating = db.Column(
        db.Float,
        default=5.0
    )


    completed_jobs = db.Column(
        db.Integer,
        default=0
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    profession = db.relationship(
        "Profession",
        backref=db.backref(
            "technicians",
            lazy=True
        )
    )


    user = db.relationship(
        "User",
        backref=db.backref(
            "technician_profile",
            uselist=False
        )
    )


    def to_dict(self):

        return {

            "id": self.id,

            "user_id": self.user_id,

            "name":
                self.user.full_name
                if self.user
                else None,

            "phone":
                self.user.phone
                if self.user
                else None,

            "email":
                self.user.email
                if self.user
                else None,

            "profile_image":
                self.user.profile_image
                if self.user
                else None,

            "specialization":
                self.specialization,

            "profession_id":
                self.profession_id,

            "profession":
                self.profession.name
                if self.profession
                else None,

            "profession_category":
                self.profession.category
                if self.profession
                else None,

            "location":
                self.location,

            "availability":
                self.availability,

            "rating":
                self.rating,

            "completed_jobs":
                self.completed_jobs,

            "created_at":
                self.created_at.isoformat()
                if self.created_at
                else None

        }

