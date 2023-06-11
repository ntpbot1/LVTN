import axiosClient from "./apiClient";
const registerPost = {
  create(payload) {
    const url = "/real-easte/create";
    return axiosClient.post(url, payload, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
  createInfo(payload) {
    const url = `/real-easte/create-info`;
    return axiosClient.post(url, payload, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
};
export default registerPost;
