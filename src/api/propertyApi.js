import axiosClient from "./apiClient";
const propertyApi = {
  getAll() {
    const url = "/real-easte/getall";
    return axiosClient.get(url);
  },
};

export default propertyApi;
