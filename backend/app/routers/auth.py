from fastapi import FastAPI, APIRouter, Depends, HTTPException, Response, Request
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from app.crud import user_crud
from app.schemas import user_schema, message_schema
from app import database, models
from starlette.middleware.sessions import SessionMiddleware
import datetime
import jwt

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="your_secret_key")

router = APIRouter()

SECRET_KEY = "your_super_secret_key"


# jwtトークンの作成
def create_jwt_token(name: str):
    expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    payload = {"sub": name, "exp": expiration}
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")


# jwtトークンの検証
def verify_jwt_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Session expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid session")


def create_hash_password(password):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    hashed_password = pwd_context.hash(password)

    return hashed_password


def varify_password(passwrod, hashed_password):
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    return pwd_context.verify(passwrod, hashed_password)


@router.post("/signup", response_model=user_schema.UserResponse)
def signup(
    user_data: user_schema.UserCreate,
    request: Request,
    db: Session = Depends(database.get_db),
):

    if user_crud.get_user_by_name(db, user_data.name):
        raise HTTPException(status_code=400, detail="already exists")

    # 新規ユーザーの作成
    new_user = models.User(
        name=user_data.name, password=create_hash_password(user_data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # セッションにtokenを保存（ユーザー名は保存しない）
    token = create_jwt_token(new_user.name)
    request.session["token"] = token

    return new_user


@router.post("/login", response_model=user_schema.UserResponse)
def login(
    response: Response,
    login_request: user_schema.LoginRequest,
    request: Request,
    db: Session = Depends(database.get_db),
):
    user = user_crud.get_user_by_name(db, login_request.name)
    if not user or not varify_password(login_request.password, user.password):
        raise HTTPException(status_code=401, detail="認証失敗")

    # セッションにtokenを保存（ユーザー名は保存しない）
    token = create_jwt_token(user.name)

    return {"name": user.name, "token": token}


@router.post("/logout")
def logout(request: Request):
    request.session.clear()
    return {"message": "ログアウトしました"}


@router.get("/check_login", response_model=user_schema.UserResponse)
def check_login(
    response: Response,
    request: Request,
    db: Session = Depends(database.get_db),
):
    token = request.session.get("token")
    print(token)
    # if not token:
    #     raise HTTPException(status_code=400)
    # name = verify_jwt_token(token)  # JWT の検証
    # print(name)
    return {"name": "test", "token": "tmp"}
