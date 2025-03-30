"use client";

import { Box } from "@mui/material";
import Link from "next/link";
import { useAuth } from "./auth_context";
import { Explain } from "./components/explain";
import LoginForm from "./components/login_form";
import SignupForm from "./components/signup_form";
import { useState } from "react";

enum AuthFormState {
	Login = 0,
	Signup = 1,
}

export default function Page() {
	const { user, logout } = useAuth();
	const [authForm, setAuthForm] = useState(AuthFormState.Login);

	const toggleForm = () => {
		setAuthForm((prev) =>
			prev === AuthFormState.Login ? AuthFormState.Signup : AuthFormState.Login,
		);
	};

	return (
		<div style={{ textAlign: "center", marginTop: "50px", padding: "0 20px" }}>
			<div
				style={{
					display: "flex",
					padding: "0 20px",
					marginBottom: "20px",
				}}
			>
				<Link
					href="/"
					style={{
						padding: "8px 16px",
						backgroundColor: "#4285F4",
						color: "white",
						borderRadius: "4px",
						textDecoration: "none",
						fontSize: "14px",
					}}
				>
					TOPページへ戻る
				</Link>
			</div>
			<h1>ID/PASS 認証</h1>
			<p style={{ marginBottom: "20px" }}>
				ID/PASSを使用した認証の例です。
				<br />
				ログインするとユーザー情報が表示されます。
			</p>

			<div style={{ marginBottom: "15px" }}>
				<Box sx={{ m: 3 }}>
					<Explain />
				</Box>
			</div>

			{user ? (
				<div>
					<div
						style={{
							margin: "20px auto",
							padding: "15px",
							maxWidth: "400px",
							backgroundColor: "#f0f8ff",
							borderRadius: "8px",
							border: "1px solid #ccc",
						}}
					>
						<p>
							ログイン済み: <strong>{user?.name}</strong>
						</p>
					</div>

					<div style={{ marginTop: "20px" }}>
						<button
							type="button"
							onClick={logout}
							style={{
								padding: "10px 20px",
								backgroundColor: "#EA4335",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
								fontSize: "16px",
							}}
						>
							ログアウト
						</button>
					</div>
				</div>
			) : (
				<Box sx={{ mt: 3 }}>
					{authForm === AuthFormState.Login ? <LoginForm /> : <SignupForm />}
					<button
						type="button"
						onClick={toggleForm}
						style={{
							marginTop: "15px",
							padding: "8px 16px",
							backgroundColor: "transparent",
							color: "#4285F4",
							border: "none",
							cursor: "pointer",
							fontSize: "14px",
						}}
					>
						{authForm === AuthFormState.Login
							? "アカウント登録に切り替え"
							: "ログイン画面に切り替え"}
					</button>
				</Box>
			)}
		</div>
	);
}
