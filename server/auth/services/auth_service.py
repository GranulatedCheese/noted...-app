from typing import Annotated
from jwt.exceptions import InvalidTokenError, ExpiredSignatureError, DecodeError, InvalidSignatureError
from auth.utils.auth_utils import verify_password
from core.config_loader import settings
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from datetime import datetime, timedelta, timezone
from core.database import get_db
from user.services.user_service import get_user_by_email

import jwt
import redis

SECRET_KEY = settings.JWT_SECRET_KEY
ALGORITHM = "HS256"

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/token")
redis_client = redis.StrictRedis(host='localhost', port=8000, db=get_db)

def authenticate_user(email: str, password: str, db:Session = Depends(get_db)):
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def verify_token(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    if not token or token == 'null':
        raise credentials_exception
    
    try:
        if redis_client.get(token):
            raise credentials_exception
    except Exception as e:
        print(f"Warning: Redis error during token blacklist check: {e}")
        pass

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    # except ExpiredSignatureError:
    #     raise HTTPException(
    #         status_code=status.HTTP_401_UNAUTHORIZED,
    #         detail="Token has expired",
    #         headers={"WWW-Authenticate": "Bearer"},
    #     )
    # except InvalidSignatureError:
    #     raise credentials_exception
    # except DecodeError:
    #     raise credentials_exception
    except InvalidTokenError:
        raise credentials_exception
    
    user = get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    # return user
    return payload


async def invalidate_token(token: Annotated[str, Depends(oauth2_scheme)]):
    payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    if payload:
        redis_client.set(token, "blacklisted")
        return {"message": "Invalidated token successfully"}
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
