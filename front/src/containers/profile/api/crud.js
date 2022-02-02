import { apiClient } from '../../../config/axios';

export const postAvatar = async (id, data) => {
  console.log(data);
  return apiClient.post(`/uploads/${id}`, data, {headers: {'enctype': 'multipart/form-data'}});
}