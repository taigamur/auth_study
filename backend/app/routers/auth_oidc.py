from fastapi import Depends
from app.auth import oidc_auth

@app.get("/oidc_protected")
def protected_route(payload: dict = Depends(oidc_auth.verify_jwt)):
    """認証が必要なエンドポイント"""
    return {"message": "You have access!", "user": payload}