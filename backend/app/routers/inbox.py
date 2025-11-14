
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..deps import get_db
from ..auth import get_current_user

router = APIRouter(prefix="/inbox", tags=["inbox"])

@router.get("/threads")
def list_threads(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    threads = db.query(models.MessageThread).all()
    out = []
    for t in threads:
        out.append({
            "id": t.id,
            "customer_id": t.customer_id,
            "customer_name": t.customer.name if t.customer else None,
            "last_message": t.last_message,
            "last_time": t.last_time,
        })
    return out

@router.get("/threads/{thread_id}")
def get_thread(
    thread_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    t = db.query(models.MessageThread).filter(models.MessageThread.id == thread_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Thread not found")
    return {
        "id": t.id,
        "customer_id": t.customer_id,
        "customer_name": t.customer.name if t.customer else None,
        "messages": [
            {
                "id": m.id,
                "sender": m.sender,
                "text": m.text,
                "created_at": m.created_at.isoformat(),
            }
            for m in t.messages
        ],
    }

@router.post("/threads/{thread_id}/messages", response_model=schemas.MessageOut)
def send_message(
    thread_id: int,
    msg: schemas.MessageBase,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    t = db.query(models.MessageThread).filter(models.MessageThread.id == thread_id).first()
    if not t:
        raise HTTPException(status_code=404, detail="Thread not found")
    m = models.Message(thread_id=thread_id, sender=msg.sender, text=msg.text)
    t.last_message = msg.text
    t.last_time = "Just now"
    db.add(m)
    db.commit()
    db.refresh(m)
    return m
