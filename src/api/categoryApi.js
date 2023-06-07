import axiosClient from "./apiClient";
const categoryApi = {
  getAll() {
    const url = "/category/getall";
    return axiosClient.get(url);
  },
  add(name, type) {
    const url = "/category/create";
    return axiosClient.post(
      url,
      { name: name, type: type },
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
        },
      }
    );
  },
  update(name, type, id) {
    const url = `/category/edit/${id}`;
    return axiosClient.put(
      url,
      { name: name, type: type },
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
        },
      }
    );
  },
  delete(id) {
    const url = `/category/delete/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
      },
    });
  },
};
export default categoryApi;
