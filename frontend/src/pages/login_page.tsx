import { Button, Container } from "@mui/material";
import { Logout } from "../components/features/auth/logout"; // Add this line to import the Logout component
import LoginForm from "../components/features/auth/login_form";
import { useState } from "react";
import SignupForm from "../components/features/auth/signup_form";
import { Explain } from "../components/features/auth/explain";
import { useAuth } from "../context/auth_context";

export const LoginPage = () => {
	const { user } = useAuth();
	const [loginForm, setLoginForm] = useState(true);

	const handleClick = () => {
		setLoginForm(!loginForm);
	};

	console.log(user);

	console.log(loginForm);

	return (
		<>
			<div>
				{user ? (
					<span>{user.name}さん、ログインしています。</span>
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
				{user ? <Logout /> : loginForm ? <LoginForm /> : <SignupForm />}
			</Container>
			{loginForm ? (
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
