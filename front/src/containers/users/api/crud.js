import { apiClient } from '../../../config/axios';

export const getUsers = async () => {
  return apiClient.get('/users');
}

export const getUser = async (id) => {
  return apiClient.get(`/users/${id}`);
}

export const getUserByCommentId = async (id) => {
  if(id) {
    return apiClient.get(`/comments/${id}/user`);
  }
  return null;
}

export const getAvatar = async (id) => {
  return apiClient.get(`/users/${id}/avatar`);
}