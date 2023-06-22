import axiosClient from "./apiClient";
const propertyApi = {
  getAll() {
    const url = "/real-easte/";
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
  getDetailNew(slug) {
    const url = `/real-easte/detail/${slug}`;
    return axiosClient.get(url);
  },
};

export default propertyApi;
