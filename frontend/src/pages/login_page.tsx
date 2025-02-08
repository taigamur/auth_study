import { Button, Container } from "@mui/material";
import { Logout } from "../components/features/auth/logout";
import LoginForm from "../components/features/auth/login_form";
import { useState } from "react";
import SignupForm from "../components/features/auth/signup_form";
import { Explain } from "../components/features/auth/explain";
import { useAuth } from "../context/auth_context";
import { Header } from "../components/features/auth/header";

enum AuthFormState {
	Login = 0,
	Signup = 1,
}

export const LoginPage = () => {
	const { user } = useAuth();
	const [authForm, setAuthForm] = useState(AuthFormState.Login);

	const toggleForm = () => {
		setAuthForm((prev) =>
			prev === AuthFormState.Login ? AuthFormState.Signup : AuthFormState.Login,
		);
	};

	return (
		<>
			<Header />
			<Container
				component="main"
				maxWidth="md"
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginTop: 12,
					flexDirection: "column", // 縦方向に配置
				}}
			>
				{/* ユーザーがログイン済みなら Logout、未ログインならログイン or サインアップ */}
				{user ? (
					<Logout />
				) : authForm === AuthFormState.Login ? (
					<LoginForm />
				) : (
					<SignupForm />
				)}
				{/* フォームの切り替えボタン */}
				{!user && (
					<Button variant="text" onClick={toggleForm} sx={{ marginTop: 2 }}>
						{authForm === AuthFormState.Login
							? "アカウント登録に切り替え"
							: "ログイン画面に切り替え"}
					</Button>
				)}
			</Container>

			{/* 説明コンポーネント */}
			<Explain />
		</>
	);
};
