import { useQuery } from 'react-query';
import queryString from "query-string";

import { getArticles } from './api/crud';

import { ArticleForListContainer } from "./articleForList";
import { Loading } from "../../components/loading";
import { useLocation } from "react-router-dom";
import { AddArticleContainer } from "./addArticle";
import React from "react";

export const ArticlesContainer = () => {

  const params = queryString.parse(useLocation().search);

  const { isFetching, refetch, data } = useQuery('articles', () => getArticles(params));
  const articles = data?.data;

  return (
    <>
      {isFetching && <Loading/>}
      {articles?.map((article) => (<ArticleForListContainer key={article.ArticleID} article={article}/>))}
    </>
  );
};
