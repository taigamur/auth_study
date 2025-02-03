import axiosClient from "./axios_client";

const authApi = {
	login: async (email: string, password: string) => {
		try {
			const response = await axiosClient.post("/login", {
				email,
				password,
			});

			console.log("ログイン成功:", response.data);
			return response.data;
		} catch (error) {
			console.error("ログイン失敗:", error);
			throw error;
		}
	},

	logout: async () => {
		try {
			const response = await axiosClient.post("/logout");
			return response.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	},
};

export default authApi;
