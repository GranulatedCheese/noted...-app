from fastapi import File, UploadFile, APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from auth.services.auth_service import get_current_active_user
from sqlalchemy.orm import Session
from user.models.user import User
from image.services.image_service import save_image
from core.database import get_db
from image.models.image import Image

import uuid

image_router = APIRouter(prefix="/images", tags=["Images"])

@image_router.post("/upload")
async def create_upload_file(file: UploadFile = File(...), current_user: User = Depends(get_current_active_user)):
    try:
        db_image = await save_image(file, current_user)

        return db_image
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {e}")

# for final, "/canvas/{user_id}/{image_uuid}"
# @image_router.get("/{image_uuid}")
# async def read_file(image_uuid: str):
#     path =  f"{IMAGEDIR}{image_uuid}.jpg"
#     return FileResponse(path)