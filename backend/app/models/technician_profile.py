from datetime import datetime

from app.extensions import db


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

            "name": self.user.username
            if self.user else None,

            "specialization": self.specialization,

            "location": self.location,

            "availability": self.availability,

            "rating": self.rating,

            "completed_jobs": self.completed_jobs,

            "created_at": self.created_at.isoformat()
            if self.created_at else None

        }
