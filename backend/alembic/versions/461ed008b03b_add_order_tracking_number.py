"""add order tracking number

Revision ID: 461ed008b03b
Revises: 609172ef2f62
Create Date: 2026-10-08 12:19:02.905192

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '461ed008b03b'
down_revision: Union[str, Sequence[str], None] = '609172ef2f62'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Temporarily allow NULL
    op.add_column(
        'orders',
        sa.Column('tracking_number', sa.String(length=30), nullable=True)
    )

    # 2. Give existing orders a tracking number
    op.execute("""
        UPDATE orders
        SET tracking_number = 'HW-' || TO_CHAR(CURRENT_TIMESTAMP, 'YYYYMMDD') || '-' || id
        WHERE tracking_number IS NULL
    """)

    # 3. Now make it NOT NULL
    op.alter_column(
        'orders',
        'tracking_number',
        existing_type=sa.String(length=30),
        nullable=False
    )

    # 4. Add unique constraint
    op.create_unique_constraint(
        'uq_orders_tracking_number',
        'orders',
        ['tracking_number']
    )


def downgrade() -> None:
    op.drop_constraint(
        'uq_orders_tracking_number',
        'orders',
        type_='unique'
    )

    op.drop_column('orders', 'tracking_number')
