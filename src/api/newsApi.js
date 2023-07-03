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
  update(id, payload) {
    const url = `/news/edit/${id}`;
    return axiosClient.put(url, payload, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete(id) {
    const url = `/news/delete/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
export default newsApi;
