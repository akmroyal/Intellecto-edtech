from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId
from app.models.user import PyObjectId

class CourseTag(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    tag: str
    category: str
    popularity: int = 0
    related_tags: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}