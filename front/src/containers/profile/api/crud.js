import { apiClient } from '../../../config/axios';

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
  const { userId, FirstName, LastName, Phone, UniversityID} = data;

  return apiClient.put(`/users/${userId}`, {
    FirstName,
    LastName,
    Phone,
    UniversityID
  });
};