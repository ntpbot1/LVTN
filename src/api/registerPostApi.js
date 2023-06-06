import axiosClient from "./apiClient";
const registerPost = {
  create(payload) {
    const url = "/real-easte/create";
    return axiosClient.post(url, {
      title: title,
      content: content,
      expiration: expiration,
      type: type,
      thumbnail: thumbnail,
      status: status,
      category: category,
      id: id,
    });
  },
  createInfo(payload) {
    const url = "/real-easte/create-info";
    return axiosClient.post(url, {
      real_easte_id: real_easte_id,
      acreage: acreage,
      price: price,
      status: status,
      number_bedrooms: number_bedrooms,
      number_bathrooms: number_bathrooms,
      number_floors: number_floors,
      direction: direction,
      balcony_direction: balcony_direction,
      facade: facade,
      road_width: road_width,
      interior: interior,
      address: address,
      length: length,
      width: width,
      total_usable_area: total_usable_area,
      ward: ward,
      district: district,
      city: city,
      images: images,
    });
  },
};
export default registerPost;
