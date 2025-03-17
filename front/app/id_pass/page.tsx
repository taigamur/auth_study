"use client";
import { Box, Button, Container } from "@mui/material";
import { useState } from "react";
import { Explain } from "./components/explain";
import { Header } from "./components/header";
import LoginForm from "./components/login_form";
import { Logout } from "./components/logout";
import SignupForm from "./components/signup_form";
import { useAuth } from "./auth_context";

enum AuthFormState {
	Login = 0,
	Signup = 1,
}

const Page = () => {
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
				{/* 説明コンポーネント */}
				<Box sx={{ m: 5 }}>
					<Explain />
				</Box>

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
		</>
	);
};

export default Page;
