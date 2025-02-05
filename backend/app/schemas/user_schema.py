from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    password: str


class UserResponse(BaseModel):
    name: str
    token: str

    class Config:
        from_attributes = True


class LoginRequest(BaseModel):
    name: str
    password: str
