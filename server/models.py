from db import Base
from sqlalchemy import Integer, Column, String

class User(Base):
    __tablename__ = "User"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True)
    name = Column(String)