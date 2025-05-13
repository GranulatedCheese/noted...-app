from pydantic import BaseModel,  EmailStr

class UserBase(BaseModel):
    email: EmailStr
    username: str
    name: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class config:
        from_attribute = True