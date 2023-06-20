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
  verify(email, code) {
    const url = `/user/verify?email=${email}&code=${code}`;
    return axiosClient.get(url);
  },
};
export default SignUpApi;
