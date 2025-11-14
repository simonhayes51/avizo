
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)

class WaitlistEmail(Base):
    __tablename__ = "waitlist"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(255), nullable=True)
    location = Column(String(255), nullable=True)
    last_service = Column(String(100), nullable=True)
    next_job_at = Column(String(100), nullable=True)

    jobs = relationship("Job", back_populates="customer")
    threads = relationship("MessageThread", back_populates="customer")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    time = Column(String(100), nullable=False)
    type = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False, default="Pending")

    customer = relationship("Customer", back_populates="jobs")

class MessageThread(Base):
    __tablename__ = "threads"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    last_message = Column(Text, nullable=True)
    last_time = Column(String(100), nullable=True)

    customer = relationship("Customer", back_populates="threads")
    messages = relationship("Message", back_populates="thread")

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    thread_id = Column(Integer, ForeignKey("threads.id"), nullable=False)
    sender = Column(String(50), nullable=False)  # "you" | "them" | "system"
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    thread = relationship("MessageThread", back_populates="messages")
