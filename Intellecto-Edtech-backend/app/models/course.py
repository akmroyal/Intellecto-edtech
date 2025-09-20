from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field, validator
from bson import ObjectId

class Course(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    instructor_id: str  # This should be string, not ObjectId
    tags: str
    level: str
    thumbnail: Optional[str] = None
    objectives: List[str] = []
    estimated_duration: int
    is_published: bool = False
    enrollment_count: int = 0
    rating: float = 0.0
    review_count: int = 0
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    # Add validator to convert ObjectId to string
    @validator('instructor_id', pre=True, always=True)
    def convert_objectid_to_str(cls, v):
        if isinstance(v, ObjectId):
            return str(v)
        return v

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}