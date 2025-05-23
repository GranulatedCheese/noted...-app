from pydantic import BaseModel,  EmailStr

class UserBase(BaseModel):
    email: EmailStr
    username: str
    name: str | None = None

class UserCreate(UserBase):
    hashed_password: str
    pass

class User(UserBase):
    id: int

    class config:
        from_attribute = True