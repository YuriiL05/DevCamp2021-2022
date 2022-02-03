import React from "react";
import { useQuery } from 'react-query';
import queryString from "query-string";
import { useLocation, useOutletContext } from "react-router-dom";

import { getArticles } from '../api/crud';
import { Loading } from "../../../components/loading";
import { ArticleForList } from "../../../components/articleForList";

export const ArticlesListContainer = () => {
  const handleArticleEdit = useOutletContext();

  const params = queryString.parse(useLocation().search);

  const { isFetching, refetch, data } = useQuery('articles', () => getArticles(params));
  const articles = data?.data;

  return (
    <>
      {isFetching && <Loading/>}
      {articles?.map((article) => (<ArticleForList
        key={article.ArticleID}
        article={article}
        handleArticleEdit={handleArticleEdit}/>
      ))}
    </>
  );
};

