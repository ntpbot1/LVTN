import axiosClient from "./apiClient";
const userApi = {
  changeInfo(payload) {
    const url = "/user/update";
    return axiosClient.put(url, payload, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
};
export default userApi;
