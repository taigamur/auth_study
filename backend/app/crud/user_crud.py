from app.schemas import user_schema
from sqlalchemy.orm import Session
from app import models


def create_user(db: Session, user: user_schema.UserCreate):
    db_user = models.User(name=user.name, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_name(db: Session, name: str):
    return db.query(models.User).filter(models.User.name == name).first()
