from models.User.UserModel import User
from sqlalchemy.orm import Session
from models.User.UserSchema import UserBase

from services import PasswordServices as pds

def create_user(db: Session, data: UserBase):
    # hashed_password = pds.pwd_context.hash(data.password)
    #                                       , hashed_password=hashed_password
    user_instance = User(**data.model_dump())
    db.add(user_instance)
    db.commit()
    db.refresh(user_instance)

    return user_instance

def get_all_users(db: Session):
    return db.query(User).all()

def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

def delete_user(db: Session, user_id: int):
    user_instance = db.query(User).filter(User.id==user_id).first()
    db.delete(user_instance)
    db.commit()

    return user_instance

def update_user(db: Session, user: UserBase, user_id: int):
    user_instance = db.query(User).filter(User.id==user_id).first()
    if user_instance:
        for key, value in user.model_dump().items():
            setattr(user_instance, key, value)
        db.commit()
        db.refresh(user_instance)
    return user_instance