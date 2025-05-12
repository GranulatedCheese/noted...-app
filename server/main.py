from typing import Union

from fastapi import FastAPI, File, UploadFile, Depends, HTTPException
from fastapi.responses import FileResponse
import uuid

import models, services, schemas
from db import get_db, engine

from sqlalchemy.orm import Session

IMAGEDIR = "images/"

app = FastAPI()
# db.create_table()

@app.post("/canvas/upload/")
async def create_upload_file(file: UploadFile = File(...)):

    file.filename = f"{uuid.uuid4()}.jpg"
    contents = await file.read()

    with open(f"{IMAGEDIR}{file.filename}", "wb") as f:
        f.write(contents)

    return {"filename": file.filename}

# for final, "/canvas/{user_id}/{image_uuid}"
@app.get("/canvas/{image_uuid}")
async def read_file(image_uuid: str):
    path =  f"{IMAGEDIR}{image_uuid}.jpg"
    return FileResponse(path)

@app.get("/users/", response_model=list[schemas.User])
async def get_all_users(db: Session = Depends(get_db)):
    return services.get_users(db)

@app.post("/users/", response_model=schemas.User)
async def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return services.create_user(db, user)

@app.delete("/users/{user_id}", response_model=schemas.User)
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    user_queryset = services.delete_user(db, user_id)
    if user_queryset:
        return user_queryset
    raise HTTPException(status_code=404, detail="Invalid User ID.")

@app.put("/users/{user_id}", response_model=schemas.User)
async def update_user(user: schemas.UserCreate, user_id: int, db: Session=Depends(get_db)):
    db_update = services.update_user(db, user, user_id)
    if not db_update:
        raise HTTPException(status_code=404, detail="User Not Found")
    return db_update