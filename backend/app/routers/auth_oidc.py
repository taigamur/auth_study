from fastapi import Depends, APIRouter
from app.auth import oidc_auth
from app.schemas import message_schema
from app.auth.oidc_auth import VerfifyAuth0Token, VerifyGoogleOIDCToken

router = APIRouter()

# Auth0認証
auth0 = VerfifyAuth0Token()

# Google OIDC認証
google_auth = VerifyGoogleOIDCToken()


@router.get("/oidc_protected", response_model=message_schema.MessageResponse)
def protected_route(payload: dict = Depends(auth0.verify_jwt)):
    """Auth0認証が必要なエンドポイント"""
    return {"message": "You have access to Auth0 protected route!", "user": payload}


@router.get("/google_oidc_protected", response_model=message_schema.MessageResponse)
def google_protected_route(payload: dict = Depends(google_auth.verify_jwt)):
    """Google OIDC認証が必要なエンドポイント"""
    return {
        "message": "You have access to Google OIDC protected route!",
        "user": payload,
    }
