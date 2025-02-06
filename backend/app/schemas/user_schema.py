from pydantic import BaseModel, Field


class UserCreate(BaseModel):
    name: str = Field(..., min_length=5)
    password: str


class UserResponse(BaseModel):
    name: str

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    name: str
    password: str
