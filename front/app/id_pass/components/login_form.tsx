"use client";

import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useAuth } from "../auth_context";

const LoginForm = () => {
	const [name, setName] = useState<string>("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);

	const { login } = useAuth();

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		if (!name || !password) {
			setError("Nameとパスワードを入力してください。");
			return;
		}

		try {
			await login(name, password);
			setError(null);
			alert("ログイン成功！");
		} catch (error) {
			console.error(error);
			setError("ログインに失敗しました。");
		}
	};

	return (
		<div style={{ maxWidth: "400px", margin: "0 auto" }}>
			<h2>ログイン</h2>
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
						backgroundColor: "#4285F4",
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
					disabled={!name || !password}
				>
					ログイン
				</button>
			</Box>
		</div>
	);
};

export default LoginForm;
