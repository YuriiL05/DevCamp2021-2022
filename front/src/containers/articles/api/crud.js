import { apiClient } from '../../../config/axios';

export const getArticles = async ( params ) => {
  return apiClient.get('/articles', { params });
}

export const getArticle = async ( articleId ) => {
  return apiClient.get(`/articles/${articleId}`);
}

export const getAccessLevels = async () => {
  return apiClient.get('/accessLevels');
}

export const postAddArticle = async (data) => {
  const { UserID, Title, Body, AccessLevel, date} = data;

  return apiClient.post(`/articles`, {
    UserID,
    Title,
    Body,
    AccessLevelID: AccessLevel.value,
    Date: date
  });
}

export const putEditArticle = async (data) => {
  const { ArticleID, Title, Body, AccessLevel} = data;

  return apiClient.put(`/articles/${ArticleID}`, {
    ArticleID,
    Title,
    Body,
    AccessLevelID: AccessLevel.value,
  });
};

