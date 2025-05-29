from fastapi import File, UploadFile, APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from auth.services.auth_service import get_current_active_user
from sqlalchemy.orm import Session
from user.models.user import User
from image.services.image_service import save_image, get_users_images, get_image_by_id, get_image_ids_by_user
from core.database import get_db
from image.models.image import Image

from uuid import UUID

image_router = APIRouter(prefix="/images", tags=["Images"])

@image_router.post("/upload")
async def create_upload_file(file: UploadFile = File(...), current_user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    try:
        db_images = await save_image(file, current_user, db)

        return db_images
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image: {e}")

@image_router.get("/me/images")
async def get_current_users_images(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    db_users_images = get_users_images(db, current_user.id)
    return db_users_images

@image_router.get("/me/image-ids")
async def get_current_users_image_ids(db: Session = Depends(get_db), current_user: User = Depends(get_current_active_user)):
    db_image_ids = get_image_ids_by_user(db, current_user.id)
    return db_image_ids

@image_router.get("/{image_id}")
async def read_images(image_id: UUID):
    try:
        image_data = get_image_by_id(image_id)
        return image_data
    
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Image: {image_id} not found")
    

# for final, "/canvas/{user_id}/{image_uuid}"
# @image_router.get("/{image_uuid}")
# async def read_file(image_uuid: str):
#     path =  f"{IMAGEDIR}{image_uuid}.jpg"
#     return FileResponse(path)