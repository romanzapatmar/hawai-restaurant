from pydantic import BaseModel, ConfigDict, Field
from typing import Optional


class ContactCreate(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    message: str


class ContactResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    message: str

    model_config = ConfigDict(from_attributes=True)


class ReviewCreate(BaseModel):
    name: str
    rating: int = Field(..., ge=1, le=5)
    message: Optional[str] = None


class ReviewResponse(BaseModel):
    id: int
    name: str
    rating: int
    message: Optional[str]

    model_config = ConfigDict(from_attributes=True)