from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship

from app.database import Base


class Order(Base):
    __tablename__ = "orders"
    restaurant_table = relationship("RestaurantTable")

    @property
    def table_number(self):
        return (
            self.restaurant_table.table_number
            if self.restaurant_table else None
        )

    id = Column(Integer, primary_key=True, index=True)
    tracking_number = Column(
        String(30),
        unique=True,
        index=True,
        nullable=False
    )
    order_type = Column(String(20), nullable=False, default="delivery")
    table_id = Column(Integer, ForeignKey("restaurant_tables.id"), nullable=True)

    customer_name = Column(String(150), nullable=False)
    phone = Column(String(20), nullable=False)
    address = Column(String(500), nullable=True)

    status = Column(String(50), default="pending")

    total_amount = Column(Float, default=0)

    items = relationship(
        "OrderItem",
        back_populates="order",
        cascade="all, delete-orphan"
    )


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(Integer, primary_key=True, index=True)

    order_id = Column(
        Integer,
        ForeignKey("orders.id"),
        nullable=False
    )

    menu_item_id = Column(
        Integer,
        ForeignKey("menu_items.id"),
        nullable=False
    )

    quantity = Column(Integer, nullable=False)

    price = Column(Float, nullable=False)

    order = relationship(
        "Order",
        back_populates="items"
    )