from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.menu import router as menu_router
from app.routes.order import router as order_router
from app.routes.admin import router as admin_router
from app.routes.contact import router as contact_router
from app.routes.tables import router as tables_router


app = FastAPI(
    title="Hawai Restaurant API",
    description="Backend API for Hawai Restaurant",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,    
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://hawai-restaurant-2p6p8nm66-romanzapatmars-projects.vercel.app",
        "https://hawai-restaurant-itgmd6x4w-romanzapatmars-projects.vercel.app",
        "https://hawai-restaurant.vercel.app",
        "https://hawai-restaurant-aer8t5h7z-romanzapatmars-projects.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(menu_router)
app.include_router(order_router)
app.include_router(admin_router)
app.include_router(contact_router)
app.include_router(tables_router)


@app.get("/")
async def root():
    return {
        "message": "Hawai Restaurant API is running"
    }
