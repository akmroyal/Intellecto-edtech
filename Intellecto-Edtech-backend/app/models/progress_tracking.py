from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId
from app.models.user import PyObjectId

class ProgressTracking(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId
    course_id: PyObjectId
    enrolled_at: datetime = Field(default_factory=datetime.utcnow)
    completed_lessons: List[dict] = []
    quiz_attempts: List[dict] = []
    project_submissions: List[dict] = []
    current_module_id: Optional[PyObjectId] = None
    current_lesson_id: Optional[PyObjectId] = None
    completion_percentage: float = 0.0
    last_accessed: Optional[datetime] = None

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}