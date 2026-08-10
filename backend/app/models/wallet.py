from datetime import datetime

from app.extensions import db


class Wallet(db.Model):

    __tablename__ = "wallets"

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

    balance = db.Column(
        db.Float,
        nullable=False,
        default=0.0
    )

    pending_balance = db.Column(
        db.Float,
        nullable=False,
        default=0.0
    )

    currency = db.Column(
        db.String(10),
        nullable=False,
        default="KES"
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

    user = db.relationship(
        "User",
        backref=db.backref(
            "wallet",
            uselist=False
        )
    )

    def to_dict(self):

        return {
            "id": self.id,
            "user_id": self.user_id,
            "balance": self.balance,
            "pending_balance": self.pending_balance,
            "currency": self.currency,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            ),
            "updated_at": (
                self.updated_at.isoformat()
                if self.updated_at
                else None
            )
        }

    def __repr__(self):
        return f"<Wallet user_id={self.user_id}>"
