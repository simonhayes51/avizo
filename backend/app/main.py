
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from . import models
from .routers import waitlist, customers, jobs, inbox
from . import auth
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Avizo API")

# Configure CORS based on environment
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in allowed_origins],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(waitlist.router, prefix="/api")
app.include_router(customers.router, prefix="/api")
app.include_router(jobs.router, prefix="/api")
app.include_router(inbox.router, prefix="/api")

@app.get("/")
def root():
    return {"status": "ok", "service": "avizo-backend"}

@app.get("/health")
def health():
    """Health check endpoint with configuration info"""
    return {
        "status": "healthy",
        "allowed_origins": os.getenv("ALLOWED_ORIGINS", "http://localhost:5173"),
        "database_configured": bool(os.getenv("DATABASE_URL")),
        "jwt_configured": bool(os.getenv("JWT_SECRET_KEY"))
    }
