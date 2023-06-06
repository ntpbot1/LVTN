import axiosClient from "./apiClient";
const newsApi = {
  getAll() {
    const url = "/news/getall";
    return axiosClient.get(url);
  },
};
export default newsApi;
