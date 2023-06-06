import axiosClient from "./apiClient";
const propertyApi = {
  getAll() {
    const url = "/real-easte/getall";
    return axiosClient.get(url);
  },
  get(id) {},
  add(data) {},
  update(data) {},
  remove(id) {},
};

export default propertyApi;
