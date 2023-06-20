import axiosClient from "./apiClient";
const paymentApi = {
  getPayment(payload) {
    const url = "/payment/create_payment_url";
    return axiosClient.post(url, payload, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
};
export default paymentApi;
