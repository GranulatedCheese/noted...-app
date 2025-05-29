from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import Integer, String, Boolean, DateTime, UUID
from core.database import Base
from datetime import datetime, timezone

import uuid

class Group(Base):
    __tablename__ = 'groups'

    id: Mapped[UUID] = mapped_column(UUID, default=uuid.uuid4, primary_key=True, nullable=False, unique=True)
    group_name: Mapped[String] = mapped_column(String(128), nullable=False)
    description: Mapped[String] = mapped_column(String)