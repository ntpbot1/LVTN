import axiosClient from "./apiClient";
const newsApi = {
  getAll() {
    const url = "/news/getall";
    return axiosClient.get(url);
  },
  getDetailNew(id) {
    const url = `/news/${id}`;
    return axiosClient.get(url);
  },
  add(payload) {
    const url = "/news/create";
    return axiosClient.post(url, payload, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default newsApi;
