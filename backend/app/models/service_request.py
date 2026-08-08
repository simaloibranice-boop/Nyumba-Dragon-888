from datetime import datetime

from app.extensions import db


class ServiceRequest(db.Model):

    __tablename__ = "service_requests"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    title = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=False
    )

    location = db.Column(
        db.String(255),
        nullable=False
    )

    status = db.Column(
        db.String(50),
        default="Pending"
    )

    price = db.Column(
        db.Float,
        default=0
    )

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    technician_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True
    )

    service_id = db.Column(
        db.Integer,
        db.ForeignKey("services.id"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    customer = db.relationship(
        "User",
        foreign_keys=[customer_id],
        backref="customer_requests"
    )

    technician = db.relationship(
        "User",
        foreign_keys=[technician_id],
        backref="assigned_jobs"
    )

    service = db.relationship(
        "Service",
        backref="requests"
    )

    def to_dict(self):

        return {

            "id": self.id,

            "title": self.title,

            "description": self.description,

            "location": self.location,

            "status": self.status,

            "price": self.price,

            "customer_id": self.customer_id,

            "technician_id": self.technician_id,

            "service_id": self.service_id,

            "created_at": self.created_at.isoformat()

        }

    def __repr__(self):
        return f"<ServiceRequest {self.id}>"
