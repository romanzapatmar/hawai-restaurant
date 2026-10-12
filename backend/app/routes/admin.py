from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/admin",
    tags=["Admin"]
)


ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"


class AdminLogin(BaseModel):
    username: str
    password: str


@router.post("/login")
def admin_login(login_data: AdminLogin):

    if (
        login_data.username != ADMIN_USERNAME
        or login_data.password != ADMIN_PASSWORD
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    return {
        "success": True,
        "message": "Login successful",
        "username": ADMIN_USERNAME
    }