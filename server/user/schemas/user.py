from pydantic import BaseModel, EmailStr, UUID4


class UserBase(BaseModel):
    username: str
    email: EmailStr
    user_uuid: UUID4


class UserCreate(UserBase):
    password: str


class UserSchema(UserBase):
    id: int

    class Config:
        from_attributes = True