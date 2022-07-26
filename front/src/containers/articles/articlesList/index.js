import React from "react";
import { useQuery } from 'react-query';
import queryString from "query-string";
import { useLocation } from "react-router-dom";

import { getArticles } from '../api/crud';
import { Loading } from "../../../components/loading";
import { ArticleForListContainer } from "../articleForList";

export const ArticlesListContainer = () => {
  const params = queryString.parse(useLocation().search);

  const { isFetching, data } = useQuery('articles', () => getArticles(params));
  const articles = data?.data;

  return (
    <>
      {isFetching && <Loading/>}
      {articles?.map((article) => (
        <ArticleForListContainer
          key={article.ArticleID}
          article={article}
        />
      ))}
    </>
  );
};

