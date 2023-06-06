import axiosClient from "./apiClient";
const categoryApi = {
  getAll() {
    const url = "/category/getall";
    return axiosClient.get(url);
  },
};
export default categoryApi;
