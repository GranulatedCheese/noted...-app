from fastapi import File, UploadFile, APIRouter
from fastapi.responses import FileResponse
import uuid

IMAGEDIR = "images/"
route = APIRouter(prefix="/canvas", tags=["canvas"])

@route.post("/upload/")
async def create_upload_file(file: UploadFile = File(...)):

    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()

    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)

    return {"filename": file.filename}

# for final, "/canvas/{user_id}/{image_uuid}"
@route.get("/{image_uuid}")
async def read_file(image_uuid: str):
    path =  f"{IMAGEDIR}{image_uuid}.jpg"
    return FileResponse(path)