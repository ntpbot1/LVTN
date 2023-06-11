import axiosClient from "./apiClient";
const SignUpApi = {
  signUp(fullName, email, password) {
    const url = "/user/sign-in";
    return axiosClient.post(url, {
      fullName: fullName,
      email: email,
      password: password,
    });
  },
};
export default SignUpApi;
