import axiosClient from "./apiClient";
const approvePost = {
  approve(id) {
    const url = `/real-easte/approve/${id}`;
    return axiosClient.put(
      url,
      {},
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
        },
      }
    );
  },
  disApprove(id) {
    const url = `/real-easte/disaprove/${id}`;
    return axiosClient.put(
      url,

      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
        },
      }
    );
  },
  delete(id) {
    const url = `/real-easte/delete/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
      },
    });
  },
};
export default approvePost;
