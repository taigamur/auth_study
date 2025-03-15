from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi import HTTPException, Depends
import os
import jwt
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
