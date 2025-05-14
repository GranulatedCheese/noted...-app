from fastapi import FastAPI
from routes import UserRoutes, ImageRoutes

import db

IMAGEDIR = "images/"

app = FastAPI()

app.include_router(UserRoutes.route)
app.include_router(ImageRoutes.route)
# db.create_table()