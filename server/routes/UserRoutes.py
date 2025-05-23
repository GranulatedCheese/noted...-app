from fastapi import Depends, HTTPException, APIRouter, status
import services.PasswordServices as ps
import models.User.UserSchema as userSchema
import models.Token.TokenSchema as tokenSchema
import services.UserServices as services

from db import get_db

from sqlalchemy.orm import Session

route = APIRouter(prefix="/users", tags=["users"])

@route.get("/", response_model=list[userSchema.User])
async def get_all_users(db: Session = Depends(get_db)):
    return services.get_all_users(db)

@route.get("/{username}", response_model=userSchema.User)
async def get_user_by_username(username: str, db: Session = Depends(ps.verify_user_token(get_db))):
    return services.get_user_by_username(db, username)

@route.post("/", response_model=userSchema.User)
async def register_user(user: userSchema.UserBase, db: Session = Depends(get_db)):
    db_user = services.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists.")
    return services.create_user(db, user)

@route.delete("/{user_id}", response_model=userSchema.User)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_queryset = services.delete_user(db, user_id)
    if user_queryset:
        return user_queryset
    raise HTTPException(status_code=404, detail="Invalid User ID.")

@route.put("/{user_id}", response_model=userSchema.User)
async def update_user(user: userSchema.UserBase, user_id: int, db: Session=Depends(get_db)):
    db_update = services.update_user(db, user, user_id)
    if not db_update:
        raise HTTPException(status_code=404, detail="User Not Found")
    return db_update

# Token Stuff

@route.post("/token", response_model=tokenSchema.TokenBase)
async def login_for_access_token(form_data: ps.OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = ps.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = ps.timedelta(minutes=ps.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = ps.create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@route.get("/verify-token/{token}", response_model=userSchema.User)
async def verify_user_token(token: str):
    ps.verify_token(token=token)
    return {"message": "Token is valid"}

