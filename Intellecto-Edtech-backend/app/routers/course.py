from fastapi import APIRouter, HTTPException, status, Query, Depends
from typing import List, Optional
from bson import ObjectId

from app.crud.course import (
    get_course_by_id, get_all_courses, create_course, 
    update_course, delete_course, get_courses_by_instructor,
    get_courses_by_tags, increment_enrollment, update_course_rating
)
from app.schemas.course import CourseCreate, CourseUpdate, CourseResponse
from app.models.course import Course

router = APIRouter(prefix="/courses", tags=["courses"])

@router.post("/", response_model=CourseResponse, status_code=status.HTTP_201_CREATED)
async def create_new_course(course: CourseCreate):
    try:
        return await create_course(course)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[CourseResponse])
async def read_courses(
    skip: int = 0,
    limit: int = 100,
    instructor_id: Optional[str] = Query(None, description="Filter by instructor ID"),
    tags: Optional[str] = Query(None, description="Comma-separated tags to filter by")
):
    try:
        if tags:
            # Convert comma-separated tags to list
            tag_list = [tag.strip() for tag in tags.split(",") if tag.strip()]
            return await get_courses_by_tags(tag_list, skip, limit)
        elif instructor_id:
            return await get_courses_by_instructor(instructor_id, skip, limit)
        else:
            return await get_all_courses(skip, limit)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{course_id}", response_model=CourseResponse)
async def read_course(course_id: str):
    course = await get_course_by_id(course_id)
    if course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.put("/{course_id}", response_model=CourseResponse)
async def update_existing_course(course_id: str, course: CourseUpdate):
    updated_course = await update_course(course_id, course)
    if updated_course is None:
        raise HTTPException(status_code=404, detail="Course not found")
    return updated_course

@router.delete("/{course_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_course(course_id: str):
    success = await delete_course(course_id)
    if not success:
        raise HTTPException(status_code=404, detail="Course not found")

@router.post("/{course_id}/enroll", status_code=status.HTTP_200_OK)
async def enroll_in_course(course_id: str):
    success = await increment_enrollment(course_id)
    if not success:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"message": "Enrollment successful"}

@router.post("/{course_id}/rate", status_code=status.HTTP_200_OK)
async def rate_course(course_id: str, rating: float = Query(..., ge=0, le=5)):
    success = await update_course_rating(course_id, rating)
    if not success:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"message": "Rating updated successfully"}