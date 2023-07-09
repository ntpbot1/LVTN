import axiosClient from "./apiClient";
const userApi = {
  changeInfo(payload) {
    const url = "/user/update";
    return axiosClient.put(url, payload, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  forgetPass(payload) {
    const url = "/user/forgetpass";
    return axiosClient.put(url, { email: payload });
  },
};
export default userApi;
