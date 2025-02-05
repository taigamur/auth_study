import { Button, Container } from "@mui/material";
import LoginForm from "../components/features/auth/login_form";
import { useEffect, useState } from "react";
import SignupForm from "../components/features/auth/signup_form";
import { Explain } from "../components/features/auth/explain";
import { authApi } from "../api";

export const LoginPage = () => {
  const [login, setLogin] = useState(false);
  const [name, setName] = useState(false);

  useEffect(() => {
    authApi.check_login().then((data) => {
      console.log(data);

      if (data?.name) {
        setName(data.name);
      }
    });
  }, []);

  const handleClick = () => {
    setLogin(!login);
  };
  return (
    <>
      <div>
        {name ? (
          <span>{name}さん、ログインしています。</span>
        ) : (
          <span>ログインしていません。</span>
        )}
      </div>
      <div>
        <Explain />
      </div>
      <Container
        component="main"
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {login ? <LoginForm /> : <SignupForm />}
      </Container>
      {login ? (
        <Button variant="text" onClick={handleClick}>
          アカウント登録に切り替え
        </Button>
      ) : (
        <Button variant="text" onClick={handleClick}>
          ログイン画面に切り替え
        </Button>
      )}
    </>
  );
};
