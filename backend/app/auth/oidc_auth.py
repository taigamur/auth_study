from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException, Depends
import os
import jwt
import time
import requests
from typing import Optional


class VerfifyAuth0Token:

    def __init__(self):
        self.AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
        self.API_AUDIENCE = os.getenv("AUTH0_AUDIENCE")
        self.ALGORITHMS = ["RS256"]

        jwks_url = f"https://{self.AUTH0_DOMAIN}/.well-known/jwks.json"
        self.jwks_client = jwt.PyJWKClient(jwks_url)

    async def verify_jwt(
        self, token: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer())
    ):
        try:
            signing_key = self.jwks_client.get_signing_key_from_jwt(
                token.credentials
            ).key
        except jwt.exceptions.PyJWKClientError as error:
            raise HTTPException(status_code=403, detail=str(error))
        except jwt.exceptions.DecodeError as error:
            raise HTTPException(status_code=403, detail=str(error))

        try:
            payload = jwt.decode(
                token.credentials,
                signing_key,
                algorithms=self.ALGORITHMS,
                audience=self.API_AUDIENCE,
                issuer=f"https://{self.AUTH0_DOMAIN}/",
            )
            return payload
        except Exception as error:
            raise HTTPException(status_code=403, detail=str(error))


class VerifyGoogleOIDCToken:
    """GoogleのOIDCトークンを検証するクラス"""

    def __init__(self):
        self.GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
        # Googleのトークン情報エンドポイント
        self.tokeninfo_url = "https://oauth2.googleapis.com/tokeninfo"

    async def verify_jwt(
        self, token: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer())
    ):
        """アクセストークンを検証する"""
        try:
            # Googleのtokeninfoエンドポイントを使用してアクセストークンを検証
            response = requests.get(
                self.tokeninfo_url, params={"access_token": token.credentials}
            )

            # レスポンスが成功しなかった場合はエラーを発生させる
            if response.status_code != 200:
                error_detail = response.json().get(
                    "error_description", "トークン検証エラー"
                )
                raise HTTPException(status_code=403, detail=error_detail)

            # トークン情報を取得
            token_info = response.json()

            # クライアントIDの検証
            if token_info.get("aud") != self.GOOGLE_CLIENT_ID:
                raise HTTPException(status_code=403, detail="無効なクライアントID")

            # トークンが有効期限切れでないことを確認
            if int(token_info.get("exp", 0)) < int(time.time()):
                raise HTTPException(
                    status_code=403, detail="トークンの有効期限が切れています"
                )

            return token_info
        except requests.RequestException as error:
            raise HTTPException(
                status_code=403, detail=f"トークン検証リクエストエラー: {str(error)}"
            )
        except Exception as error:
            raise HTTPException(
                status_code=403, detail=f"トークン検証エラー: {str(error)}"
            )
