import { apiClient } from '../../../config/axios';

export const getArticles= async ( params ) => {
  return apiClient.get('/articles', { params });
}