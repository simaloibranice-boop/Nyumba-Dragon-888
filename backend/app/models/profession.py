from datetime import datetime

from app.extensions import db


class Profession(db.Model):

    __tablename__ = "professions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    name = db.Column(
        db.String(120),
        nullable=False,
        unique=True
    )

    category = db.Column(
        db.String(120),
        nullable=False
    )

    description = db.Column(
        db.Text,
        nullable=True
    )

    active = db.Column(
        db.Boolean,
        nullable=False,
        default=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "active": self.active,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            )
        }

    def __repr__(self):

        return (
            f"<Profession "
            f"{self.name}>"
        )
