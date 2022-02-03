import { apiClient } from '../../../config/axios';

export const getArticles = async ( params ) => {
  return apiClient.get('/articles', { params });
}

export const getArticle = async ( articleId ) => {
  return apiClient.get(`/articles/${articleId}`);
}

export const postAddArticle = async (data) => {
  const { UserID, Title, Body, AccessLevelID, date} = data;

  return apiClient.post(`/articles`, {
    UserID,
    Title,
    Body,
    AccessLevelID,
    Date: date
  });
}

export const putEditArticle = async (data) => {
  const { ArticleID, Title, Body, AccessLevelID} = data;

  return apiClient.put(`/articles/${ArticleID}`, {
    ArticleID,
    Title,
    Body,
    AccessLevelID
  });
};

