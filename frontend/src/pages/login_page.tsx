import { Container } from "@mui/material";
import LoginForm from "../components/features/auth/login_form";
import { useState } from "react";
import SignupForm from "../components/features/auth/signup_form";

export const LoginPage = () => {
  const [login, setLogin] = useState(false);

  console.log(login);
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {login ? <LoginForm /> : <SignupForm />}
    </Container>
  );
};
