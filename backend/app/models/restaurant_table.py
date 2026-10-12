from sqlalchemy import Column, Integer, String, Boolean
from app.database import Base


class RestaurantTable(Base):
    __tablename__ = "restaurant_tables"

    id = Column(Integer, primary_key=True, index=True)
    table_number = Column(Integer, unique=True, nullable=False)
    table_code = Column(String(32), unique=True, nullable=False, index=True)
    is_active = Column(Boolean, default=True, nullable=False)
