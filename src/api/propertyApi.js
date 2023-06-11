import axiosClient from "./apiClient";
const propertyApi = {
  getAll() {
    const url = "/real-easte/getall";
    return axiosClient.get(url);
  },
  getAllNew() {
    const url = "/real-easte/get-news";
    return axiosClient.get(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
      },
    });
  },
  getDetailNew(id) {
    const url = `/real-easte/detail/${id}`;
    return axiosClient.get(url);
  },
};

export default propertyApi;
