from fastapi import File, UploadFile, Depends
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from core.database import get_db
from image.models.image import Image
from user.models.user import User
from typing import List

import uuid

async def save_image(file: UploadFile, current_user: User, db: Session) -> Image:
    file.filename = str(uuid.uuid4())
    file_location = f"image/static/images/"
    contents = await file.read()

    with open(f"{file_location}{file.filename}.png", "wb+") as f:
        f.write(contents)

    db_image = Image(
        id = file.filename,
        owner_id = current_user.id,
        image_data = file_location,
        is_public = False
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    return {db_image, file.filename}

def get_image_ids_by_user(db: Session, user_id: uuid.UUID) -> List[uuid.UUID]:
    image_ids = db.query(Image.id).filter(Image.owner_id == user_id).all()
    return [image_id[0] for image_id in image_ids]

def get_users_images(db: Session, user_id: uuid.UUID):
    image_ids = get_image_ids_by_user(db, user_id)

    for image_id in image_ids:
        path = f"image/static/images/{image_id}.png"
        return FileResponse(path)

def get_image_by_id(image_id: uuid.UUID):
    path =  f"image/static/images/{image_id}.png"
    return FileResponse(path)