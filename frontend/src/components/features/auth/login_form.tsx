import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { authApi } from "../../../api";

const LoginForm = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!name || !password) {
      setError("Nameとパスワードを入力してください。");
      return;
    }

    try {
      const response = await authApi.login(name, password);
      alert("ログインしました！");
      setError("");
      setName(response.data.name);
      sessionStorage.setItem("token", response.data.token);
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
          ログイン
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
            ログイン
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
