from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional, List

class CourseCreate(BaseModel):
    title: str
    description: str
    instructor_id: str
    tags: str
    level: str
    thumbnail: Optional[str] = None
    objectives: Optional[List[str]] = []
    estimated_duration: int
    is_published: bool = False

class CourseUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    tags: Optional[str] = None
    level: Optional[str] = None
    thumbnail: Optional[str] = None
    objectives: Optional[List[str]] = None
    estimated_duration: Optional[int] = None
    is_published: Optional[bool] = None
    enrollment_count: Optional[int] = None
    rating: Optional[float] = None
    review_count: Optional[int] = None
    updated_at: datetime = Field(default_factory=datetime.now)

class CourseResponse(BaseModel):
    id: str
    title: str
    description: str
    instructor_id: str
    tags: str
    level: str
    thumbnail: Optional[str] = None
    objectives: List[str]
    estimated_duration: int
    is_published: bool
    enrollment_count: int
    rating: float
    review_count: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True