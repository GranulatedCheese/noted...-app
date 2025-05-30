from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from auth.utils.auth_utils import get_password_hash
from user.models.user import User
from user.schemas.user import UserCreate
from fastapi import HTTPException, status

import uuid

def get_users(db: Session):
    return db.query(User).all()

def get_user(db: Session, user_id: uuid.UUID):
    return db.query(User).filter(User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, user: UserCreate):
    try:
        db_user = User(
            email = str(user.email),
            username = user.username,
            password = get_password_hash(user.password)
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="User already exists")
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=f"Error as {e}")


def delete_user(db: Session, user_id: uuid.UUID):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user:
        db.delete(db_user)
        db.commit()
    return