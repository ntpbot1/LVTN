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
  getListReply(id) {
    const url = `/comment/list-reply/${id}`;
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
  editComment(id, payload) {
    const url = `/comment/edit/${id}`;
    return axiosClient.put(
      url,
      { content: payload },
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  deleteComment(id) {
    const url = `/comment/delete/${id}`;
    return axiosClient.delete(
      url,

      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  editReply(id, payload) {
    const url = `/comment/edit-reply/${id}`;
    return axiosClient.put(
      url,
      { content: payload },
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  deleteReply(id) {
    const url = `/comment/delete-reply/${id}`;
    return axiosClient.delete(
      url,

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
  like(id) {
    const url = `/comment/like/${id}`;
    return axiosClient.post(
      url,
      {},
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  unLike(id) {
    const url = `/comment/unlike/${id}`;
    return axiosClient.delete(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
};
export default commentApi;
