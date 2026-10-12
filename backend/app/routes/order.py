from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.menu import MenuItem
from app.models.order import Order, OrderItem
from app.schemas.order import OrderCreate, OrderResponse, OrderStatusUpdate
from datetime import datetime
from app.models.restaurant_table import RestaurantTable



router = APIRouter(
    prefix="/api/orders",
    tags=["Orders"]
)



@router.post("/", response_model=OrderResponse)
def create_order(
    order_data: OrderCreate,
    db: Session = Depends(get_db)
):
    table = None

    if order_data.order_type == "dine_in":
        if not order_data.table_code:
            raise HTTPException(
                status_code=400,
                detail="Table code is required for dine-in orders"
            )

        table = db.query(RestaurantTable).filter(
            RestaurantTable.table_code == order_data.table_code,
            RestaurantTable.is_active.is_(True)
        ).first()

        if not table:
            raise HTTPException(
                status_code=400,
                detail="Invalid or inactive restaurant table"
            )

    elif order_data.order_type != "delivery":
        raise HTTPException(
            status_code=400,
            detail="Invalid order type"
        )

    if not order_data.items:
        raise HTTPException(
            status_code=400,
            detail="Order must contain at least one item"
        )
    tracking_number = (
        f"HW-{datetime.now().strftime('%Y%m%d')}-"
        f"{datetime.now().strftime('%H%M%S')}"
    )


    new_order = Order(
        order_type=order_data.order_type,
        table_id=table.id if table else None,
        tracking_number=tracking_number,
        customer_name=order_data.customer_name,
        phone=order_data.phone,
        address=order_data.address,
        status="pending",
        total_amount=0,
    )

    db.add(new_order)
    db.flush()

    total_amount = 0

    for item_data in order_data.items:

        menu_item = db.query(MenuItem).filter(
            MenuItem.id == item_data.menu_item_id
        ).first()

        if not menu_item:
            db.rollback()

            raise HTTPException(
                status_code=404,
                detail=f"Menu item {item_data.menu_item_id} not found"
            )

        if not menu_item.is_available:
            db.rollback()

            raise HTTPException(
                status_code=400,
                detail=f"{menu_item.name} is currently unavailable"
            )

        if item_data.quantity <= 0:
            db.rollback()

            raise HTTPException(
                status_code=400,
                detail="Quantity must be greater than 0"
            )

        item_total = menu_item.price * item_data.quantity

        total_amount += item_total

        order_item = OrderItem(
            order_id=new_order.id,
            menu_item_id=menu_item.id,
            quantity=item_data.quantity,
            price=menu_item.price
        )

        db.add(order_item)

    new_order.total_amount = total_amount

    db.commit()
    db.refresh(new_order)

    return new_order


@router.get("/", response_model=list[OrderResponse])
def get_orders(
    db: Session = Depends(get_db)
):
    return db.query(Order).all()


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(
    order_id: int,
    db: Session = Depends(get_db)
):

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    return order


#order status update
@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status(
    order_id: int,
    status_data: OrderStatusUpdate,
    db: Session = Depends(get_db)
):
    allowed_statuses = [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled"
    ]

    if status_data.status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Allowed statuses: {allowed_statuses}"
        )

    order = db.query(Order).filter(
        Order.id == order_id
    ).first()

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order.status = status_data.status

    db.commit()
    db.refresh(order)

    return order

