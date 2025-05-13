# from main import app as route

from fastapi import Depends, HTTPException, APIRouter

import models.User.UserSchema as schemas
import services.UserServices as services

from db import get_db

from sqlalchemy.orm import Session

route = APIRouter(prefix="/users", tags=["users"])

@route.get("/", response_model=list[schemas.User])
async def get_all_users(db: Session = Depends(get_db)):
    return services.get_users(db)

@route.post("/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return services.create_user(db, user)

@route.delete("/{user_id}", response_model=schemas.User)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_queryset = services.delete_user(db, user_id)
    if user_queryset:
        return user_queryset
    raise HTTPException(status_code=404, detail="Invalid User ID.")

@route.put("/{user_id}", response_model=schemas.User)
async def update_user(user: schemas.UserCreate, user_id: int, db: Session=Depends(get_db)):
    db_update = services.update_user(db, user, user_id)
    if not db_update:
        raise HTTPException(status_code=404, detail="User Not Found")
    return db_update