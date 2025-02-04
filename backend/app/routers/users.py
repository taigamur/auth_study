from fastapi import APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.crud import user_crud
from app.schemas import user_schema
from app import database, models

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


@router.post("/users/", response_model=user_schema.UserResponse)
def create_user(user: user_schema.UserCreate, db: Session = Depends(database.get_db)):
    return user_crud.create_user(db, user)


@router.get("/users/{user_id}", response_model=user_schema.UserResponse)
def read_user(user_id: int, db: Session = Depends(database.get_db)):
    db_user = user_crud.get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.post("/signup", response_model=user_schema.UserResponse)
def signup(
    user_data: user_schema.UserCreate,
    request: Request,
    db: Session = Depends(database.get_db),
):

    if user_crud.get_use_by_email(db, user_data.email):
        raise HTTPException(status_code=400, detail="already exists")

    hashed_password = pwd_context.hash(user_data.password)

    # 新規ユーザーの作成
    new_user = models.User(
        email=user_data.email, name=user_data.name, password=hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # セッションにユーザー情報を保存
    request.session["user"] = {
        "email": new_user.email,
        "name": new_user,
    }

    return new_user


@router.post("/login", response_model=user_schema.LoginRequest)
def login(
    response: Response,
    login_request: user_schema.LoginRequest,
    request: Request,
    db: Session = Depends(database.get_db),
):
    user = user_crud.get_use_by_email(db, login_request.email)
    if not user or user["password"] != login_request.password:
        raise HTTPException(status_code=401, detail="認証失敗")

    # セッションにユーザー情報を保存
    request.session["user"] = {
        "email": user["email"],
        "name": user["name"],
    }

    return {"message": "ログイン成功"}


@router.post("/logout")
def logout(request: Request):
    request.session.clear()
    return {"message": "ログアウトしました"}
