from fastapi import FastAPI
from routes import UserRoutes, ImageRoutes
from fastapi.middleware.cors import CORSMiddleware

import db

IMAGEDIR = "images/"

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True, 
    allow_methods=["*"], 
    allow_headers=["*"]
)

app.include_router(UserRoutes.route)
app.include_router(ImageRoutes.route)
# db.create_table()