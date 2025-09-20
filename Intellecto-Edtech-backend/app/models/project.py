from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, Field
from bson import ObjectId
from app.models.user import PyObjectId

class Project(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    module_id: PyObjectId
    title: str
    description: str
    instructions: str
    starter_code: Optional[str] = None
    solution_code: Optional[str] = None
    difficulty: str = "medium"
    estimated_time: Optional[int] = None
    criteria: List[dict]
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}