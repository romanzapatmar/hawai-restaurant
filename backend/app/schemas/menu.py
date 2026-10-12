from pydantic import BaseModel, ConfigDict
from typing import Optional


# -------------------------
# Category Schemas
# -------------------------

class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


# -------------------------
# Menu Item Schemas
# -------------------------

class MenuItemBase(BaseModel):
    name: str
    description: Optional[str] = None
    price: float
    image: Optional[str] = None
    is_vegetarian: bool = True
    is_available: bool = True
    category_id: int


class MenuItemCreate(MenuItemBase):
    pass


class MenuItemResponse(MenuItemBase):
    id: int

    model_config = ConfigDict(from_attributes=True)