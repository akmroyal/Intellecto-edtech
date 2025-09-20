from bson import ObjectId
from typing import List, Optional
from app.database import get_course_collection
from app.models.course import Course
from app.schemas.course import CourseCreate, CourseUpdate

async def get_course_by_id(course_id: str) -> Optional[Course]:
    collection = get_course_collection()
    course = await collection.find_one({"_id": ObjectId(course_id)})
    if course:
        course["id"] = str(course["_id"])
        # Convert ObjectId fields to strings
        if "instructor_id" in course and isinstance(course["instructor_id"], ObjectId):
            course["instructor_id"] = str(course["instructor_id"])
        return Course(**course)
    return None

async def get_courses_by_instructor(instructor_id: str, skip: int = 0, limit: int = 100) -> List[Course]:
    collection = get_course_collection()
    courses = []
    
    # Convert instructor_id to ObjectId for query if it's a valid ObjectId string
    try:
        instructor_obj_id = ObjectId(instructor_id)
        query = {"instructor_id": instructor_obj_id}
    except:
        query = {"instructor_id": instructor_id}
    
    async for course in collection.find(query).skip(skip).limit(limit):
        course["id"] = str(course["_id"])
        # Convert ObjectId fields to strings
        if "instructor_id" in course and isinstance(course["instructor_id"], ObjectId):
            course["instructor_id"] = str(course["instructor_id"])
        courses.append(Course(**course))
    return courses

async def get_all_courses(skip: int = 0, limit: int = 100, instructor_id: Optional[str] = None) -> List[Course]:
    collection = get_course_collection()
    courses = []
    
    # Build query based on whether instructor_id is provided
    query = {}
    if instructor_id:
        # Convert instructor_id to ObjectId for query if it's a valid ObjectId string
        try:
            instructor_obj_id = ObjectId(instructor_id)
            query["instructor_id"] = instructor_obj_id
        except:
            query["instructor_id"] = instructor_id
    
    async for course in collection.find(query).skip(skip).limit(limit):
        course["id"] = str(course["_id"])
        # Convert ObjectId fields to strings
        if "instructor_id" in course and isinstance(course["instructor_id"], ObjectId):
            course["instructor_id"] = str(course["instructor_id"])
        courses.append(Course(**course))
    
    return courses

async def get_courses_by_tags(tags: List[str], skip: int = 0, limit: int = 100) -> List[Course]:
    collection = get_course_collection()
    courses = []
    
    # Create regex pattern to match any of the tags
    tag_patterns = [{"tags": {"$regex": tag, "$options": "i"}} for tag in tags]
    query = {"$or": tag_patterns} if tag_patterns else {}
    
    async for course in collection.find(query).skip(skip).limit(limit):
        course["id"] = str(course["_id"])
        # Convert ObjectId fields to strings
        if "instructor_id" in course and isinstance(course["instructor_id"], ObjectId):
            course["instructor_id"] = str(course["instructor_id"])
        courses.append(Course(**course))
    
    return courses

async def create_course(course: CourseCreate) -> Course:
    collection = get_course_collection()
    
    course_dict = course.model_dump()
    course_dict.pop("id", None)  # Remove id if present
    
    # Convert instructor_id string to ObjectId for storage
    if "instructor_id" in course_dict and course_dict["instructor_id"]:
        try:
            course_dict["instructor_id"] = ObjectId(course_dict["instructor_id"])
        except:
            pass  # Keep as string if not valid ObjectId
    
    result = await collection.insert_one(course_dict)
    created_course = await collection.find_one({"_id": result.inserted_id})
    created_course["id"] = str(created_course["_id"])
    # Convert ObjectId fields to strings
    if "instructor_id" in created_course and isinstance(created_course["instructor_id"], ObjectId):
        created_course["instructor_id"] = str(created_course["instructor_id"])
    return Course(**created_course)

async def update_course(course_id: str, course_update: CourseUpdate) -> Optional[Course]:
    collection = get_course_collection()
    
    # Remove None values from update
    update_data = {k: v for k, v in course_update.model_dump().items() if v is not None}
    
    if not update_data:
        return None
    
    # Convert instructor_id string to ObjectId for update if provided
    if "instructor_id" in update_data and update_data["instructor_id"]:
        try:
            update_data["instructor_id"] = ObjectId(update_data["instructor_id"])
        except:
            pass  # Keep as string if not valid ObjectId
    
    result = await collection.update_one(
        {"_id": ObjectId(course_id)},
        {"$set": update_data}
    )
    
    if result.modified_count == 1:
        return await get_course_by_id(course_id)
    return None

async def delete_course(course_id: str) -> bool:
    collection = get_course_collection()
    result = await collection.delete_one({"_id": ObjectId(course_id)})
    return result.deleted_count == 1

async def increment_enrollment(course_id: str) -> bool:
    collection = get_course_collection()
    result = await collection.update_one(
        {"_id": ObjectId(course_id)},
        {"$inc": {"enrollment_count": 1}}
    )
    return result.modified_count == 1

async def update_course_rating(course_id: str, new_rating: float) -> bool:
    collection = get_course_collection()
    result = await collection.update_one(
        {"_id": ObjectId(course_id)},
        {
            "$inc": {"review_count": 1},
            "$set": {"rating": new_rating}
        }
    )
    return result.modified_count == 1