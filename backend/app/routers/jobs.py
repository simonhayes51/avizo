
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..deps import get_db
from ..auth import get_current_user

router = APIRouter(prefix="/jobs", tags=["jobs"])

@router.get("/", response_model=list[schemas.JobOut])
def list_jobs(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    return db.query(models.Job).order_by(models.Job.id.desc()).all()

@router.post("/", response_model=schemas.JobOut)
def create_job(
    data: schemas.JobCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    customer = db.query(models.Customer).filter(models.Customer.id == data.customer_id).first()
    if not customer:
        raise HTTPException(status_code=400, detail="Customer not found")

    job = models.Job(
        customer_id=data.customer_id,
        time=data.time,
        type=data.type,
        status=data.status or "Pending",
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return job
