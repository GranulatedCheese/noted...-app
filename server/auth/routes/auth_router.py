from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from typing import Annotated
from auth.models.token import Token
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from auth.services.auth_service import authenticate_user, create_access_token, verify_token
from core.database import get_db

auth_router = APIRouter(
    prefix='/auth',
    tags=['Auth'],
)


@auth_router.post('/token')
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db)
) -> Token:
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=1440)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )

    return Token(access_token=access_token, token_type="bearer")

# @auth_router.post("/invalidate-token/{token}")
# async def invalidate_user_token(token: str):
#     await invalidate_token(token=token)
#     return {"message": "Invalidated Token"}

@auth_router.get("/verify-token/{token}")
async def verify_user_token(token: str):
    try:
        await verify_token(token=token)
        return {"message": "Valid Token"}
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error: Unexpected issue in /verify-token route: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="An internal error occurred during token verification"
        )