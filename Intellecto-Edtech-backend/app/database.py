from motor.motor_asyncio import AsyncIOMotorClient
from .config import settings
from typing import Optional
import urllib.parse

class MongoDB:
    client: Optional[AsyncIOMotorClient] = None
    database = None

mongodb = MongoDB()

async def connect_to_mongo():
    try:
        # URL-encode username and password if they exist
        mongodb_url = settings.mongodb_url
        
        # If using authentication, make sure credentials are properly encoded
        if '@' in mongodb_url and '://' in mongodb_url:
            protocol, rest = mongodb_url.split('://', 1)
            if '@' in rest:
                credentials, host = rest.split('@', 1)
                if ':' in credentials:
                    username, password = credentials.split(':', 1)
                    # URL encode the password
                    encoded_password = urllib.parse.quote_plus(password)
                    encoded_username = urllib.parse.quote_plus(username)
                    mongodb_url = f"{protocol}://{encoded_username}:{encoded_password}@{host}"
        
        mongodb.client = AsyncIOMotorClient(mongodb_url)
        mongodb.database = mongodb.client[settings.database_name]
        print("✅✅ Connected to MongoDB")
        
        # Test the connection
        await mongodb.client.admin.command('ping')
        print("✅ MongoDB connection test successful")
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        raise

async def close_mongo_connection():
    if mongodb.client:
        mongodb.client.close()
        print("Disconnected from MongoDB")

def get_user_collection():
    if mongodb.database is None:
        raise RuntimeError("Database not connected. Call connect_to_mongo() first.")
    return mongodb.database.get_collection("users")

def get_course_collection():
    if mongodb.database is None:
        raise RuntimeError("Database not connected. Call connect_to_mongo() first.")
    return mongodb.database.get_collection("courses")

def get_module_collection():
    if mongodb.database is None:
        raise RuntimeError("Database not connected. Call connect_to_mongo() first.")
    return mongodb.database.get_collection("modules")

def get_lesson_collection():
    if mongodb.database is None:
        raise RuntimeError("Database not connected. Call connect_to_mongo() first.")
    return mongodb.database.get_collection("lessons")

def get_quiz_collection():
    if mongodb.database is None:
        raise RuntimeError("Database not connected. Call connect_to_mongo() first.")
    return mongodb.database.get_collection("quizzes")

def get_project_collection():
    if mongodb.database is None:
        raise RuntimeError("Database not connected. Call connect_to_mongo() first.")
    return mongodb.database.get_collection("projects")

def get_progress_collection():
    if mongodb.database is None:
        raise RuntimeError("Database not connected. Call connect_to_mongo() first.")
    return mongodb.database.get_collection("progress_tracking")

def get_ai_interaction_collection():
    if mongodb.database is None:
        raise RuntimeError("Database not connected. Call connect_to_mongo() first.")
    return mongodb.database.get_collection("ai_interactions")

def get_tag_collection():
    if mongodb.database is None:
        raise RuntimeError("Database not connected. Call connect_to_mongo() first.")
    return mongodb.database.get_collection("course_tags")
