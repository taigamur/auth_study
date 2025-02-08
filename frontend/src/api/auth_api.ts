import axiosClient from "./axios_client";

const authApi = {
	fetchUser: async () => {
		try {
			const response = await axiosClient.get("/user");
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},
	signup: async (name: string, password: string) => {
		try {
			const response = await axiosClient.post("/signup", {
				name,
				password,
			});
			return response.data;
		} catch (error) {
			console.error(error);
			throw error;
		}
	},

	login: async (name: string, password: string) => {
		try {
			const response = await axiosClient.post("/login", {
				name,
				password,
			});

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
			console.error(error);
			throw error;
		}
	},
};

export default authApi;
