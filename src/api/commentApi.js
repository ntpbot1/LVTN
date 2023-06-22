import axiosClient from "./apiClient";
const commentApi = {
  getListComment(id) {
    const url = `/comment/list-comment/${id}?column=like`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
  create(id, payload) {
    const url = `/comment/create/${id}`;
    return axiosClient.post(
      url,
      { content: payload },
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  reply(idNew, idComment, payload) {
    const url = `/comment/reply/${idNew}/${idComment}`;
    return axiosClient.post(
      url,
      { content: payload },
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
};
export default commentApi;
