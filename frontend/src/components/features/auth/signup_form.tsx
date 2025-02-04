import { TextField, Button, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { authApi } from "../../../api";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!email || !password) {
      setError("Emailとパスワードを入力してください。");
      return;
    }

    try {
      const response = await authApi.signup(email, password);
      // localStorage.setItem("authToken", response.data.token);
      alert("ログインしました！");
      setError("");
    } catch (error: any) {
      setError(error.response?.data?.message || "ログインに失敗しました。");
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
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
