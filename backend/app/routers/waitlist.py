
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..deps import get_db

router = APIRouter(prefix="/waitlist", tags=["waitlist"])

@router.post("/", response_model=schemas.WaitlistOut)
def add_to_waitlist(data: schemas.WaitlistCreate, db: Session = Depends(get_db)):
    wl = models.WaitlistEmail(email=data.email)
    db.add(wl)
    db.commit()
    db.refresh(wl)
    return wl

@router.get("/", response_model=list[schemas.WaitlistOut])
def list_waitlist(db: Session = Depends(get_db)):
    return db.query(models.WaitlistEmail).order_by(models.WaitlistEmail.created_at.desc()).all()
