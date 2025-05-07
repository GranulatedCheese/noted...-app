from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float

class Image(Base):
    __tablename__ = 'Images'

    id = Column(Integer, primary_key=true, index=True)
    