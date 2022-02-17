import { apiClient } from '../../../config/axios';
import { serialize } from "object-to-formdata";

export const postAvatar = async (id, data) => {
  return apiClient.post(`/uploads/${id}`, data, {headers: {'enctype': 'multipart/form-data'}});
}

export const getUniversities = async () => {
  return apiClient.get(`/universities`);
}

export const getFriends = async (userId) => {
  return apiClient.get(`/friends/${userId}`);
}

export const putUpdateProfile = async (data) => {
  console.log(data);
  const formData = serialize(data, { indices: true });

  return apiClient.put(`/users/${data.UserID}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
