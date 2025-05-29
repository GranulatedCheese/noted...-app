from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, DateTime, UUID, Integer, ForeignKey, Boolean
from core.database import Base
from datetime import datetime, timezone

import uuid

class Image(Base):
    __tablename__ = 'images'

    id: Mapped[UUID] = mapped_column(UUID, default=uuid.uuid4, unique=True, nullable=False, primary_key=True)
    owner_id: Mapped[UUID] = mapped_column(ForeignKey('users.id'), nullable=False)
    image_data: Mapped[String] = mapped_column(String, nullable=False)
    created_at: Mapped[DateTime] = mapped_column(DateTime, default=datetime.now(timezone.utc), nullable=False)
    is_public: Mapped[Boolean] = mapped_column(Boolean, default=False)