from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.crud import user_crud
from app.schemas import user_schema
from app import database, models

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# @router.post("/users/", response_model=user_schema.UserResponse)
# def create_user(user: user_schema.UserCreate, db: Session = Depends(database.get_db)):
#     return user_crud.create_user(db, user)


# @router.get("/users/{user_id}", response_model=user_schema.UserResponse)
# def read_user(user_id: int, db: Session = Depends(database.get_db)):
#     db_user = user_crud.get_user(db, user_id)
#     if db_user is None:
#         raise HTTPException(status_code=404, detail="User not found")
#     return db_user
