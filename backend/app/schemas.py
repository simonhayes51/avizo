
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

class WaitlistCreate(BaseModel):
    email: EmailStr

class WaitlistOut(BaseModel):
    id: int
    email: EmailStr
    created_at: datetime

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class CustomerBase(BaseModel):
    name: str
    phone: str
    email: Optional[str] = None
    location: Optional[str] = None
    last_service: Optional[str] = None
    next_job_at: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerOut(CustomerBase):
    id: int

    class Config:
        orm_mode = True

class JobBase(BaseModel):
    customer_id: int
    time: str
    type: str

class JobCreate(JobBase):
    status: Optional[str] = "Pending"

class JobOut(JobBase):
    id: int
    status: str

    class Config:
        orm_mode = True

class MessageBase(BaseModel):
    sender: str
    text: str

class MessageCreate(MessageBase):
    thread_id: int

class MessageOut(MessageBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

class ThreadOut(BaseModel):
    id: int
    customer_id: int
    customer_name: Optional[str]
    last_message: Optional[str]
    last_time: Optional[str]

    class Config:
        orm_mode = True
