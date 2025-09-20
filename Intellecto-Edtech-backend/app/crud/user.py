from bson import ObjectId
from typing import List, Optional
from app.database import get_user_collection
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

async def get_user_by_id(user_id: str) -> Optional[User]:
    collection = get_user_collection()
    user = await collection.find_one({"_id": ObjectId(user_id)})
    if user:
        user["id"] = str(user["_id"])
        return User(**user)
    return None

async def get_user_by_email(email: str) -> Optional[User]:
    collection = get_user_collection()
    user = await collection.find_one({"email": email})
    if user:
        user["id"] = str(user["_id"])
        return User(**user)
    return None

async def get_user_by_username(username: str) -> Optional[User]:
    collection = get_user_collection()
    user = await collection.find_one({"username": username})
    if user:
        user["id"] = str(user["_id"])
        return User(**user)
    return None

async def get_all_users(skip: int = 0, limit: int = 100) -> List[User]:
    collection = get_user_collection()
    users = []
    async for user in collection.find().skip(skip).limit(limit):
        user["id"] = str(user["_id"])
        users.append(User(**user))
    return users

async def create_user(user: UserCreate) -> User:
    collection = get_user_collection()
    
    # Check if user already exists
    if await get_user_by_email(user.email):
        raise ValueError("User with this email already exists")
    if await get_user_by_username(user.username):
        raise ValueError("User with this username already exists")
    
    # Hash password
    hashed_password = get_password_hash(user.password)
    user_dict = user.model_dump()
    user_dict["password"] = hashed_password
    user_dict.pop("id", None)  # Remove id if present
    
    # Insert user
    result = await collection.insert_one(user_dict)
    created_user = await collection.find_one({"_id": result.inserted_id})
    created_user["id"] = str(created_user["_id"])
    return User(**created_user)

async def update_user(user_id: str, user_update: UserUpdate) -> Optional[User]:
    collection = get_user_collection()
    
    # Remove None values from update
    update_data = {k: v for k, v in user_update.model_dump().items() if v is not None}
    
    if not update_data:
        return None
    
    # Check if username or email already exists (if being updated)
    if "username" in update_data:
        existing_user = await get_user_by_username(update_data["username"])
        if existing_user and str(existing_user.id) != user_id:
            raise ValueError("Username already taken")
    
    if "email" in update_data:
        existing_user = await get_user_by_email(update_data["email"])
        if existing_user and str(existing_user.id) != user_id:
            raise ValueError("Email already taken")
    
    # Update user
    result = await collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": update_data}
    )
    
    if result.modified_count == 1:
        return await get_user_by_id(user_id)
    return None

async def delete_user(user_id: str) -> bool:
    collection = get_user_collection()
    result = await collection.delete_one({"_id": ObjectId(user_id)})
    return result.deleted_count == 1

async def authenticate_user(username: str, password: str) -> Optional[User]:
    user = await get_user_by_username(username)
    if not user:
        user = await get_user_by_email(username)  # Try email as username
    
    if not user or not verify_password(password, user.password):
        return None
    
    return user