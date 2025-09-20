from datetime import datetime
from typing import Optional, Annotated
from pydantic import BaseModel, EmailStr, Field, BeforeValidator
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

PyObjectId = Annotated[str, BeforeValidator(str)]

class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    username: str
    email: EmailStr
    password: str
    first_name: str = Field(..., min_length=1)
    last_name: str = Field(..., min_length=1)
    role: str = "student"
    profile_picture: Optional[str] = None
    bio: Optional[str] = None
    interests: Optional[str] = None
    skill_level: str = "beginner"
    created_at: datetime = Field(default_factory=datetime.now)
    last_login: Optional[datetime] = None
    is_verified: bool = False

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        populate_by_name = True