
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas
from ..deps import get_db

router = APIRouter(prefix="/customers", tags=["customers"])

@router.get("/", response_model=list[schemas.CustomerOut])
def list_customers(db: Session = Depends(get_db)):
    return db.query(models.Customer).order_by(models.Customer.id.desc()).all()

@router.post("/", response_model=schemas.CustomerOut)
def create_customer(data: schemas.CustomerCreate, db: Session = Depends(get_db)):
    c = models.Customer(
        name=data.name,
        phone=data.phone,
        email=data.email,
        location=data.location,
        last_service=data.last_service,
        next_job_at=data.next_job_at,
    )
    db.add(c)
    db.commit()
    db.refresh(c)
    return c
