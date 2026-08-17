from datetime import datetime

from app.extensions import db
from app.models.profession import Profession


class Service(db.Model):

    __tablename__ = "services"

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
        db.String(100),
        nullable=False
    )

    profession_id = db.Column(
        db.Integer,
        db.ForeignKey("professions.id"),
        nullable=True
    )

    description = db.Column(
        db.Text,
        nullable=False
    )

    active = db.Column(
        db.Boolean,
        default=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    profession = db.relationship(
        "Profession",
        backref=db.backref(
            "services",
            lazy=True
        )
    )

    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "profession_id": self.profession_id,
            "profession": (
                self.profession.name
                if self.profession
                else None
            ),
            "profession_category": (
                self.profession.category
                if self.profession
                else None
            ),
            "description": self.description,
            "active": self.active,
            "created_at": (
                self.created_at.isoformat()
                if self.created_at
                else None
            )
        }

    def __repr__(self):

        return f"<Service {self.name}>"
