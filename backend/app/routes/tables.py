import secrets

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.restaurant_table import RestaurantTable


router = APIRouter(prefix="/api/tables", tags=["Restaurant Tables"])


class TableCreate(BaseModel):
    table_number: int = Field(..., ge=1)


@router.post("/")
def create_table(
    data: TableCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(RestaurantTable).filter(
        RestaurantTable.table_number == data.table_number
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="This table number already exists"
        )

    table = RestaurantTable(
        table_number=data.table_number,
        table_code=secrets.token_urlsafe(12),
        is_active=True
    )

    db.add(table)
    db.commit()
    db.refresh(table)

    return {
        "id": table.id,
        "table_number": table.table_number,
        "table_code": table.table_code,
        "url_path": f"/table/{table.table_code}",
        "is_active": table.is_active
    }


@router.get("/")
def get_tables(db: Session = Depends(get_db)):
    tables = db.query(RestaurantTable).order_by(
        RestaurantTable.table_number
    ).all()

    return [
        {
            "id": table.id,
            "table_number": table.table_number,
            "table_code": table.table_code,
            "url_path": f"/table/{table.table_code}",
            "is_active": table.is_active
        }
        for table in tables
    ]


@router.get("/public/{table_code}")
def get_public_table(
    table_code: str,
    db: Session = Depends(get_db)
):
    table = db.query(RestaurantTable).filter(
        RestaurantTable.table_code == table_code,
        RestaurantTable.is_active.is_(True)
    ).first()

    if not table:
        raise HTTPException(
            status_code=404,
            detail="Table not found or inactive"
        )

    return {
        "table_number": table.table_number,
        "table_code": table.table_code
    }


@router.patch("/{table_id}/deactivate")
def deactivate_table(
    table_id: int,
    db: Session = Depends(get_db)
):
    table = db.query(RestaurantTable).filter(
        RestaurantTable.id == table_id
    ).first()

    if not table:
        raise HTTPException(status_code=404, detail="Table not found")

    table.is_active = False
    db.commit()

    return {"success": True, "message": "Table deactivated"}