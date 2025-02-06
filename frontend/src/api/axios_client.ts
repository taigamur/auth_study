// src/api/axiosClient.js
import axios from "axios";

const token = sessionStorage.getItem("token");

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_APP_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

// リクエストのインターセプター（認証トークンの追加など）
axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosClient;
