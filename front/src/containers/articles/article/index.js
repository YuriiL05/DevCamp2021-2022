import React from 'react';
import { useOutletContext, useParams } from "react-router-dom";

import { Article } from '../../../components/article';
import { NotFound } from "../../../components/404";
import { useQuery } from "react-query";
import { getArticle } from "../api/crud";
import { Loading } from "../../../components/loading";

const validation = {
  digits: /^\d+$/,
  capitalLetters: /^[A-Z]+$/,
  file: /^\w+\.doc$|pdf$|jpeg$/
};

export const ArticleContainer = () => {

  const handleArticleEdit = useOutletContext();

  const { id } = useParams();

  const { isFetching, data, isFetched } = useQuery(`article${id}`, () => getArticle(id));
  const article = data?.data;

  if (!id.match(validation.digits)) {
    return <NotFound />;
  }

  return (
      <>
        {isFetching && <Loading/>}
        {isFetched && <Article article={article} handleArticleEdit={handleArticleEdit}/>}
      </>
    );
};
