import axiosClient from "./apiClient";
const paymentApi = {
  getPayment(amount, bankCode, language) {
    const url = "/payment/create_payment_url";
    return axiosClient.post(
      url,
      { amount: amount, bankCode: bankCode, language: language },
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
};
export default paymentApi;
