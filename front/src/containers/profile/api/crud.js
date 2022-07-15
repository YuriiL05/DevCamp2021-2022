import { apiClient } from '../../../config/axios';
import { serialize } from "object-to-formdata";

export const postAvatar = async (id, data) => {
  const formData = serialize(data, { indices: true });
  return apiClient.post(`/uploads/${id}`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
}

export const getUniversities = async () => {
  return apiClient.get(`/universities`);
}

export const getFriends = async (userId) => {
  return apiClient.get(`/friends/${userId}`);
}

export const putUpdateProfile = async (data) => {
  return apiClient.put(`/users/${data.UserID}`, data);
};

export const postGoogleAuth = async (data) => {
  return apiClient.post(`/auth/google`, data);
}
