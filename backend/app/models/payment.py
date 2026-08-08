from datetime import datetime

from app.extensions import db


class Payment(db.Model):

    __tablename__ = "payments"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    amount = db.Column(
        db.Float,
        nullable=False
    )

    currency = db.Column(
        db.String(10),
        nullable=False,
        default="KES"
    )

    payment_method = db.Column(
        db.String(30),
        nullable=False,
        default="M-PESA"
    )

    status = db.Column(
        db.String(30),
        nullable=False,
        default="PENDING"
    )

    transaction_reference = db.Column(
        db.String(100),
        unique=True,
        nullable=True
    )

    phone_number = db.Column(
        db.String(30),
        nullable=True
    )

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    service_request_id = db.Column(
        db.Integer,
        db.ForeignKey("service_requests.id"),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    customer = db.relationship(
        "User",
        backref="payments"
    )

    service_request = db.relationship(
        "ServiceRequest",
        backref="payments"
    )

    def to_dict(self):

        return {

            "id": self.id,

            "amount": self.amount,

            "currency": self.currency,

            "payment_method": self.payment_method,

            "status": self.status,

            "transaction_reference":
                self.transaction_reference,

            "phone_number":
                self.phone_number,

            "customer_id":
                self.customer_id,

            "service_request_id":
                self.service_request_id,

            "created_at":
                self.created_at.isoformat()
                if self.created_at else None,

            "updated_at":
                self.updated_at.isoformat()
                if self.updated_at else None

        }

    def __repr__(self):

        return f"<Payment {self.id}>"
