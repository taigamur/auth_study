import { Button, Link } from "@mui/material";

export const HomePage = () => {
  return (
    <>
      <div style={{ marginTop: 80 }}>
        <div>
          <Link href="login">username, passwordの認証を試す</Link>
        </div>
        <div style={{ marginTop: 20 }}>
          <Link href="#">Google OAuth認証を試す</Link>
        </div>
        <div style={{ marginTop: 20 }}>
          <Link href="#">SAML認証を試す</Link>
        </div>
        <div style={{ marginTop: 20 }}>
          <Link href="oidc">OIDC認証を試す</Link>
        </div>
      </div>
    </>
  );
};
