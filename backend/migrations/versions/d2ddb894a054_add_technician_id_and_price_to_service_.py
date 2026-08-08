"""Add technician_id and price to service requests

Revision ID: d2ddb894a054
Revises: faad9be30f67
Create Date: 2026-07-31
"""

from alembic import op
import sqlalchemy as sa

revision = "d2ddb894a054"
down_revision = "faad9be30f67"
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table("service_requests") as batch_op:

        batch_op.add_column(
            sa.Column(
                "price",
                sa.Float(),
                nullable=True,
                server_default="0"
            )
        )

        batch_op.add_column(
            sa.Column(
                "technician_id",
                sa.Integer(),
                nullable=True
            )
        )

        batch_op.create_foreign_key(
            "fk_service_requests_technician_id",
            "users",
            ["technician_id"],
            ["id"]
        )


def downgrade():

    with op.batch_alter_table("service_requests") as batch_op:

        batch_op.drop_constraint(
            "fk_service_requests_technician_id",
            type_="foreignkey"
        )

        batch_op.drop_column("technician_id")

        batch_op.drop_column("price")
