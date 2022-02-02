import { apiClient } from '../../../config/axios';

export const postAvatar = async (id, data) => {
  console.log(data);
  return apiClient.post(`/uploads/${id}`, data, {headers: {'enctype': 'multipart/form-data'}});
}

export const getUniversities = async () => {
  return apiClient.get(`/universities`);
}

export const putUpdateProfile = async (data) => {
  console.log(data);
  console.log("API Update Article");
  const { userId, FirstName, LastName, Phone, UniversityID} = data;
  return apiClient.put(`/users/${userId}`, {
    FirstName,
    LastName,
    Phone,
    UniversityID
  }).then(function (response) {
    console.log(response);
  })
    .catch(function (error) {
      console.log(error);
    });
};