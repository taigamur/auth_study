from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import users
from app.database import engine
from app import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(users.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React の URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
