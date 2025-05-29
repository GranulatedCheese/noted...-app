from fastapi import File, UploadFile, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from core.database import get_db
from image.models.image import Image
from user.models.user import User
from auth.services.auth_service import get_current_active_user

import uuid

async def create_upload_file(file: UploadFile = File(...), current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    file.filename = str(uuid.uuid4())
    file_location = "image/static/images/"
    contents = await file.read()

    with open(f"{file_location}{file.filename}.png", "wb") as f:
        f.write(contents)

    db_image = Image(
        id=file.filename,
        owner_id=current_user.id,
        image_data=file_location,
        is_public=False
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return {db_image, file.filename}