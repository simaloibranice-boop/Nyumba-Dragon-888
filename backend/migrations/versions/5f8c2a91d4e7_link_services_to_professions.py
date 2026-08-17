"""link services to professions

Revision ID: 5f8c2a91d4e7
Revises: e2e1bbeb06f2
Create Date: 2026-08-16 14:14:00.000000
"""

from alembic import op
import sqlalchemy as sa


revision = "5f8c2a91d4e7"
down_revision = "e2e1bbeb06f2"
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table(
        "services",
        schema=None
    ) as batch_op:

        batch_op.add_column(
            sa.Column(
                "profession_id",
                sa.Integer(),
                nullable=True
            )
        )

        batch_op.create_foreign_key(
            "fk_services_profession_id",
            "professions",
            ["profession_id"],
            ["id"]
        )


def downgrade():

    with op.batch_alter_table(
        "services",
        schema=None
    ) as batch_op:

        batch_op.drop_constraint(
            "fk_services_profession_id",
            type_="foreignkey"
        )

        batch_op.drop_column(
            "profession_id"
        )
