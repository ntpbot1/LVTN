import axiosClient from "./apiClient";
const LoginApi = {
  login(payload) {
    const url = "/user/login";
    return axiosClient.post(url, {
      email: payload.email,
      password: payload.password,
    });
  },
};
export default LoginApi;
