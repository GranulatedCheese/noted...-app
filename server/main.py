# from fastapi import FastAPI
# from routes import ImageRoutes
# from fastapi.middleware.cors import CORSMiddleware

# import server.core.database as database

# IMAGEDIR = "images/"

# app = FastAPI()

# origins = [
#     "http://localhost:5173"
# ]

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins, 
#     allow_credentials=True, 
#     allow_methods=["*"], 
#     allow_headers=["*"]
# )

# # app.include_router(UserRoutes.route)
# app.include_router(ImageRoutes.route)
# # db.create_table()

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from core.config_loader import settings

from auth.routes.auth_router import auth_router
from image.routes.image_router import image_router
from user.routes.user_router import user_router

import core.database as database

openapi_tags = [
    {
        "name": "Users",
        "description": "User operations",
    },
    {
        "name": "Images",
        "description": "Image operations",
    }
]

app = FastAPI(openapi_tags=openapi_tags)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(auth_router, prefix='/api')
app.include_router(image_router, prefix="/api", tags=['Images'])
app.include_router(user_router, prefix='/api', tags=['Users'])

database.create_table()