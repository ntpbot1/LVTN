import axiosClient from "./apiClient";
const LoginApi = {
  login(email, password) {
    const url = "/user/login";
    return axiosClient.post(url, {
      email: email,
      password: password,
    });
  },
};
export default LoginApi;
