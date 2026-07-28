from datetime import datetime

from app.extensions import db


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


    def to_dict(self):

        return {
            "id": self.id,
            "name": self.name,
            "category": self.category,
            "description": self.description,
            "active": self.active,
            "created_at": self.created_at.isoformat()
        }


    def __repr__(self):

        return f"<Service {self.name}>"
