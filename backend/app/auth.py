
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
from . import models, schemas
from .deps import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login(data: schemas.UserLogin, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == data.email).first()
    if not user:
        # create user on first login (MVP)
        hashed = bcrypt.hash(data.password)
        user = models.User(email=data.email, hashed_password=hashed)
        db.add(user)
        db.commit()
        db.refresh(user)
    else:
        if not bcrypt.verify(data.password, user.hashed_password):
            raise HTTPException(status_code=400, detail="Incorrect password")

    return {"token": f"demo-{user.id}", "email": user.email}
