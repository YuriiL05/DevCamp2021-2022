import { apiClient } from '../../../config/axios';

export const getArticles = async ( params ) => {
  return apiClient.get('/articles', { params });
}

export const getArticle = async ( articleId ) => {
  return apiClient.get(`/articles/${articleId}`);
}

export const postAddArticle = async (data) => {
  const { UserID, Title, Body, AccessLevelID, date} = data;
  console.log(date);
  console.log("API Add Article");
  return apiClient.post(`/articles`, {
    UserID,
    Title,
    Body,
    AccessLevelID,
    Date: date
  }).then(function (response) {
    console.log(response);
  })
    .catch(function (error) {
      console.log(error);
    });
}

export const putEditArticle = async (data) => {
  console.log(data);
  console.log("API Update Article");
  const { ArticleID, Title, Body, AccessLevelID} = data;
  return apiClient.put(`/articles/${ArticleID}`, {
    ArticleID,
    Title,
    Body,
    AccessLevelID
  }).then(function (response) {
    console.log(response);
  })
    .catch(function (error) {
      console.log(error);
    });
};

