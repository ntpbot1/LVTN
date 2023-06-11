import axiosClient from "./apiClient";
const adminApi = {
  login(email, password) {
    const url = "/user/login-admin";
    return axiosClient.post(url, {
      email: email,
      password: password,
    });
  },
};
export default adminApi;
