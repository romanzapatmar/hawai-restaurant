from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int


class OrderCreate(BaseModel):
    order_type: str = "delivery"
    table_code: Optional[str] = None
    customer_name: str
    phone: str
    address: Optional[str] = None
    items: List[OrderItemCreate]

class OrderStatusUpdate(BaseModel):
    status: str

class OrderItemResponse(BaseModel):
    id: int
    menu_item_id: int
    quantity: int
    price: float

    model_config = ConfigDict(from_attributes=True)


class OrderResponse(BaseModel):
    id: int
    tracking_number: str
    customer_name: str
    phone: str
    address: Optional[str]
    status: str
    total_amount: float

    items: List[OrderItemResponse]

    model_config = ConfigDict(from_attributes=True)