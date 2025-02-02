import axiosClient from "./axios_client";

const userApi = {
  getUser: (userId: string) => axiosClient.get(`/users/${userId}`),
};

export default userApi;
