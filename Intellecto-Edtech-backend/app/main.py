from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from bson import ObjectId

from app.database import connect_to_mongo, close_mongo_connection
from app.crud.user import (
    get_all_users, get_user_by_id, create_user, 
    update_user, delete_user, authenticate_user
)
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from app.models.user import User

app = FastAPI(title="EduMind API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Startup and shutdown events
@app.on_event("startup")
async def startup_event():
    await connect_to_mongo()

@app.on_event("shutdown")
async def shutdown_event():
    await close_mongo_connection()

# User CRUD endpoints
@app.post("/users/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: UserCreate):
    try:
        return await create_user(user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/users/", response_model=List[UserResponse])
async def read_users(skip: int = 0, limit: int = 100):
    return await get_all_users(skip, limit)

@app.get("/users/{user_id}", response_model=UserResponse)
async def read_user(user_id: str):
    user = await get_user_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/users/{user_id}", response_model=UserResponse)
async def update_existing_user(user_id: str, user: UserUpdate):
    try:
        updated_user = await update_user(user_id, user)
        if updated_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return updated_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.delete("/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_user(user_id: str):
    success = await delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")

# Authentication endpoint
@app.post("/auth/login")
async def login(username: str, password: str):
    user = await authenticate_user(username, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"message": "Login successful", "user_id": str(user.id)}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "message": "EduMind API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)