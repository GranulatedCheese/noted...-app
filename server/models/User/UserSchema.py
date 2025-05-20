from pydantic import BaseModel,  EmailStr

class UserBase(BaseModel):
    email: EmailStr
    username: str
    name: str
    password: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class config:
        from_attribute = True