from fastapi import Depends, APIRouter
from app.auth import oidc_auth
from app.schemas import message_schema
from app.auth.oidc_auth import VerfifyAuth0Token

router = APIRouter()

auth = VerfifyAuth0Token()


@router.get("/oidc_protected", response_model=message_schema.MessageResponse)
def protected_route(payload: dict = Depends(auth.verify_jwt)):
    """認証が必要なエンドポイント"""
    return {"message": "You have access!", "user": payload}
