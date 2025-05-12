from models import User
from sqlalchemy.orm import Session
from schemas import UserCreate

def create_user(db: Session, data: UserCreate):
    user_instance = User(**data.model_dump())
    db.add(user_instance)
    db.commit()
    db.refresh(user_instance)

    return user_instance

def get_users(db: Session):
    return db.query(User).all()

def delete_user(db: Session, user_id: int):
    user_instance = db.query(User).filter(User.id==user_id).first()
    db.delete(user_instance)
    db.commit()

    return user_instance

def update_user(db: Session, user: UserCreate, user_id: int):
    user_instance = db.query(User).filter(User.id==user_id).first()
    if user_instance:
        for key, value in user.model_dump().items():
            setattr(user_instance, key, value)
        db.commit()
        db.refresh(user_instance)
    return user_instance