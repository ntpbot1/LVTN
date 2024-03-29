import axiosClient from "./apiClient";
const propertyApi = {
  getAll() {
    const url = "/real-easte/";
    return axiosClient.get(url);
  },
  getAllNew() {
    const url = "/real-easte/get-news";
    return axiosClient.get(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
      },
    });
  },
  getAllUserSeen() {
    const url = "/real-easte/user-seen";
    return axiosClient.get(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
  getDetailNew(slug) {
    const url = `/real-easte/detail/${slug}`;
    return axiosClient.get(url);
  },
  search(title) {
    const url = `/real-easte/search?title=${title}`;
    return axiosClient.get(url);
  },
  searchCategory(category) {
    const url = `/real-easte/${category}?page=1&limit=10`;
    return axiosClient.get(url);
  },
  save(id) {
    const url = `/real-easte/save/${id}`;
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
  unSave(id) {
    const url = `/real-easte/unsave/${id}`;
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
  getSave() {
    const url = `/real-easte/get-saved`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
  getByUser() {
    const url = `/real-easte/news-user`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
  rePost(slug, type, expiration) {
    const url = `real-easte/re-post/${slug}`;
    return axiosClient.put(
      url,
      { type: type, expiration: expiration },
      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("token")}`,
        },
      }
    );
  },
  editNew(id, payload) {
    const url = `real-easte/edit/${id}`;
    return axiosClient.put(url, payload, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
  editInfoNew(id, payload) {
    const url = `real-easte/edit-info/${id}`;
    return axiosClient.put(url, payload, {
      headers: {
        Authorization: `token ${sessionStorage.getItem("token")}`,
      },
    });
  },
  hidden(id) {
    const url = `real-easte/hidden/${id}`;
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
  getHidden() {
    const url = `real-easte/get-hidden`;
    return axiosClient.get(
      url,

      {
        headers: {
          Authorization: `token ${sessionStorage.getItem("tokenAdmin")}`,
        },
      }
    );
  },
  restore(id) {
    const url = `real-easte/restore/${id}`;
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
  statistical(start, end) {
    const url = "real-easte/statistical";
    return axiosClient.post(url, { start: start, end: end });
  },
};

export default propertyApi;
