"use client";

import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../auth_context";

const SignupForm = () => {
	const { signup } = useAuth();
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		if (!name || !password) {
			setError("Nameとパスワードを入力してください。");
			return;
		}

		if (name.length < 5) {
			setError("ユーザー名は5文字以上にしてください");
			return;
		}

		if (password.length < 5) {
			setError("パスワードは5文字以上にしてください");
			return;
		}

		try {
			await signup(name, password);
			alert("登録しました！");
			setError("");
		} catch (error) {
			console.error(error);
			setError("ユーザー登録に失敗しました。");
		}
	};

	return (
		<div style={{ maxWidth: "400px", margin: "0 auto" }}>
			<h2>アカウント登録</h2>
			<Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
				<TextField
					label="Name"
					variant="outlined"
					fullWidth
					margin="normal"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					label="パスワード"
					type="password"
					variant="outlined"
					fullWidth
					margin="normal"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				{error && (
					<Typography color="error" variant="body2" sx={{ mt: 1 }}>
						{error}
					</Typography>
				)}
				<button
					type="submit"
					style={{
						padding: "12px 24px",
						backgroundColor: "#34A853",
						color: "white",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
						fontSize: "16px",
						width: "100%",
						marginTop: "16px",
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					登録
				</button>
			</Box>
		</div>
	);
};

export default SignupForm;
