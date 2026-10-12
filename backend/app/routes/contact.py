from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.contact import ContactMessage, Review
from app.schemas.contact import (
    ContactCreate,
    ContactResponse,
    ReviewCreate,
    ReviewResponse
)


router = APIRouter(
    prefix="/api/contact",
    tags=["Contact"]
)


# -------------------------
# Contact Message
# -------------------------

@router.post("/", response_model=ContactResponse)
def create_contact_message(
    contact_data: ContactCreate,
    db: Session = Depends(get_db)
):
    new_message = ContactMessage(
        name=contact_data.name,
        email=contact_data.email,
        phone=contact_data.phone,
        message=contact_data.message
    )

    db.add(new_message)
    db.commit()
    db.refresh(new_message)

    return new_message


@router.get("/", response_model=list[ContactResponse])
def get_contact_messages(
    db: Session = Depends(get_db)
):
    return (
        db.query(ContactMessage)
        .order_by(ContactMessage.id.desc())
        .all()
    )


# -------------------------
# Reviews
# -------------------------

@router.post("/reviews", response_model=ReviewResponse)
def create_review(
    review_data: ReviewCreate,
    db: Session = Depends(get_db)
):
    if review_data.rating < 1 or review_data.rating > 5:
        raise HTTPException(
            status_code=400,
            detail="Rating must be between 1 and 5"
        )

    new_review = Review(
        name=review_data.name,
        rating=review_data.rating,
        message=review_data.message
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)

    return new_review


@router.get("/reviews", response_model=list[ReviewResponse])
def get_reviews(
    db: Session = Depends(get_db)
):
    return (
        db.query(Review)
        .order_by(Review.id.desc())
        .all()
    )