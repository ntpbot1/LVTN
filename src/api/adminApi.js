import axiosClient from "./apiClient";
const adminApi = {
  login(payload) {
    const url = "/user/login-admin";
    return axiosClient.post(url, {
      email: payload.email,
      password: payload.password,
    });
  },
};
export default adminApi;
