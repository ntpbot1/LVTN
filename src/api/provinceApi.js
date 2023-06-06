import axios from "axios";
import axiosProvince from "./axiosProvince";
const provinceApi = {
  getAll(params) {
    const url = "/api/?depth=2";
    return axiosProvince.get(url, { params });
  },
  get(id) {},
  add(data) {},
  update(data) {},
  remove(id) {},
};

export default provinceApi;
