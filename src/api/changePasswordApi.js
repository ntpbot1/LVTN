import axiosClient from "./apiClient";
const changePassword = {
  change(password, newPass) {
    const url = "/user/changepass";
    return axiosClient.put(
      url,
      {
        password: password,
        newPass: newPass,
      },
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
};
export default changePassword;
