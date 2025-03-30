// src/api/axiosClient.js
import axios from "axios";

const token =
	typeof sessionStorage !== "undefined" ? sessionStorage.getItem("token") : "";

const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	},
});

// リクエストのインターセプター（認証トークンの追加など）
axiosClient.interceptors.request.use((config) => {
	const token =
		typeof sessionStorage !== "undefined"
			? sessionStorage.getItem("token")
			: "";
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default axiosClient;
