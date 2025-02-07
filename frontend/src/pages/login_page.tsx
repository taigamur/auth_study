import { Button, Container } from "@mui/material";
import { Logout } from "../components/features/auth/logout"; // Add this line to import the Logout component
import LoginForm from "../components/features/auth/login_form";
import { useState } from "react";
import SignupForm from "../components/features/auth/signup_form";
import { Explain } from "../components/features/auth/explain";
import { useAuth } from "../context/auth_context";
import { Header } from "../components/features/auth/header";

export const LoginPage = () => {
	const { user } = useAuth();
	const [loginForm, setLoginForm] = useState(true);

	const handleClick = () => {
		setLoginForm(!loginForm);
	};

	return (
		<>
			<Header />
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
					marginTop: 20,
				}}
			>
				{user ? <Logout /> : loginForm ? <LoginForm /> : <SignupForm />}
			</Container>
			<Container>
				{loginForm ? (
					<Button variant="text" onClick={handleClick}>
						アカウント登録に切り替え
					</Button>
				) : (
					<Button variant="text" onClick={handleClick}>
						ログイン画面に切り替え
					</Button>
				)}
			</Container>
		</>
	);
};
