import { Box, Button, TextField, Typography } from "@mui/material";
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
		<>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box>登録</Box>
				<Box component="form" onSubmit={handleSubmit} sx={{ width: "300px" }}>
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
						<Typography color="error" variant="body2">
							{error}
						</Typography>
					)}
					<Button
						type="submit"
						variant="contained"
						color="primary"
						fullWidth
						sx={{ mt: 2 }}
					>
						登録
					</Button>
				</Box>
			</Box>
		</>
	);
};

export default SignupForm;
