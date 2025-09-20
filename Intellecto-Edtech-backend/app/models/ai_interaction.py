from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId
from app.models.user import PyObjectId

class AIInteraction(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId
    course_id: Optional[PyObjectId] = None
    lesson_id: Optional[PyObjectId] = None
    question: str
    answer: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    helpful: Optional[bool] = None
    topic: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}