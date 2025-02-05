import { TextField, Button, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { authApi } from "../../../api";

const SignupForm = () => {
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  console.log(user);

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!name || !password) {
      setError("Nameとパスワードを入力してください。");
      return;
    }

    try {
      const response = await authApi.signup(name, password);
      // localStorage.setItem("authToken", response.data.token);
      alert("ログインしました！");
      setError("");
      setUser(response.data);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    } catch (error: any) {
      setError(error.response?.data?.message || "ユーザー登録に失敗しました。");
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
        <Typography variant="h5" gutterBottom>
          サインアップ
        </Typography>
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
