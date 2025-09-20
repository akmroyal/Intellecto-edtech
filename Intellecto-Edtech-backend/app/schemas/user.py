from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    role: Optional[str] = "student"
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    interests: Optional[str] = None
    skill_level: Optional[str] = "beginner"

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    interests: Optional[str] = None
    skill_level: Optional[str] = None
    last_login: Optional[datetime] = None
    is_verified: Optional[bool] = None

class UserResponse(BaseModel):
    id: str
    username: str
    email: EmailStr
    first_name: str
    last_name: str
    role: str
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    interests: Optional[str] = None
    skill_level: str
    created_at: datetime
    last_login: Optional[datetime] = None
    is_verified: bool

    class Config:
        from_attributes = True