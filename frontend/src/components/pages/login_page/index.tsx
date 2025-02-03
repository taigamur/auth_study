import { Container } from "@mui/material";
import LoginForm from "../../features/auth/login_form";

export const LoginPage = () => {
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
      <LoginForm />
    </Container>
  );
};
