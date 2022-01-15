import React from 'react';
import { useParams } from "react-router-dom";

import { Article } from '../../components/article';
import { NotFound } from "../../components/404";

export const ArticleContainer = () => {
  const validation = {
    digits: /^\d+$/,
    capitalLetters: /^[A-Z]+$/,
    file: /^\w+\.doc$|pdf$|jpeg$/
  }

  const { id } = useParams();
  const articleInfo = {
    title: "My Article title",
    text: "Some info about",
    accessLevel: 1,
    authorId: 2,
    creationDate: "2022-01-15 12:15",
    comments: [
      {
        commentId: 1,
        authorId: 3,
        text: "Some comment"
      },
      {
        commentId: 2,
        authorId: 2,
        text: "Some comment"
      }
    ]
  };

  if (id.match(validation.digits)) {
    return (
      <>
        <Article id={id} articleInfo={articleInfo} test={"Digits"}/>
      </>
    );
  } else if (id.match(validation.capitalLetters)) {
    return (
      <>
        <Article id={id} articleInfo={articleInfo} test={"A-Z"}/>
      </>
    );
  } else if (id.match(validation.file)) {
    return (
      <>
        <Article id={id} articleInfo={articleInfo} test={"File"}/>
      </>
    );
  } else {
    return (
      <NotFound/>
    );
  }
};
