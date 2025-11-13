
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from . import models
from .routers import waitlist, customers, jobs, inbox
from . import auth

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Avizo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
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
