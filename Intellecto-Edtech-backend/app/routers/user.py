from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from bson import ObjectId

from app.crud.user import (
    get_all_users, get_user_by_id, create_user, 
    update_user, delete_user, authenticate_user,
    get_user_by_email, get_user_by_username,
)
from app.schemas.user import UserCreate, UserUpdate, UserResponse
from app.models.user import User

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_new_user(user: UserCreate):
    try:
        return await create_user(user)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[UserResponse])
async def read_users(skip: int = 0, limit: int = 100):
    return await get_all_users(skip, limit)

@router.get("/email/{email}", response_model=UserResponse)
async def read_user_by_email(email: str):
    user = await get_user_by_email(email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/username/{username}", response_model=UserResponse)
async def read_user_by_username(username: str):
    user = await get_user_by_username(username)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/by-email", response_model=UserResponse)
async def read_user_by_email_query(email: str | None = None):
    """Lookup user by email using query param `?email=`. Validates param and returns 400 when missing."""
    if not email:
        raise HTTPException(status_code=400, detail="Missing email query parameter")
    user = await get_user_by_email(email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.get("/{user_id}", response_model=UserResponse)
async def read_user(user_id: str):
    # validate ObjectId-like string before attempting to convert
    try:
        # this will raise if not a valid ObjectId
        from bson import ObjectId
        _ = ObjectId(user_id)
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid user id format")

    user = await get_user_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/{user_id}", response_model=UserResponse)
async def update_existing_user(user_id: str, user: UserUpdate):
    try:
        updated_user = await update_user(user_id, user)
        if updated_user is None:
            raise HTTPException(status_code=404, detail="User not found")
        return updated_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_existing_user(user_id: str):
    success = await delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
