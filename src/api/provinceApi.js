import axiosProvince from "./provincesApi";
const provinceApi = {
  getAllProvinces() {
    const url = "/api/?depth=2";
    return axiosProvince.get(url);
  },
  get(id) {},
  add(data) {},
  update(data) {},
  remove(id) {},
};

export default provinceApi;
