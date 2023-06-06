import axiosClient from "./apiClient";
const SignUpApi = {
  signUp(payload) {
    const url = "/user/sign-in";
    return axiosClient.post(url, {
      fullName: payload.fullName,
      email: payload.email,
      password: payload.password,
    });
  },
};
export default SignUpApi;
