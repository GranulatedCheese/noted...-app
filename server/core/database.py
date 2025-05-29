from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from core.config_loader import settings

engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)

SessionLocal = sessionmaker(autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_table():
    Base.metadata.create_all(bind=engine)