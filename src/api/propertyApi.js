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
  getDetailNew(slug) {
    const url = `/real-easte/detail/${slug}`;
    return axiosClient.get(url);
  },
  searh(title) {
    const url = `/real-easte/search?title=${title}`;
    return axiosClient.get(url);
  },
  searhCategory(category) {
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
  rePost(slug) {
    const url = `real-easte/re-post/${slug}`;
    return axiosClient.put(url, {
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
