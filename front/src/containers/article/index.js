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

  if (id.match(validation.digits)) {
    return (
      <div className={"article"}>
        <Article id={id} test={"Digits"}/>
      </div>
    );
  } else if (id.match(validation.capitalLetters)) {
    return (
      <div className={"article"}>
        <Article id={id} test={"Digits"}/>
      </div>
    );
  } else if (id.match(validation.file)) {
    return (
      <div className={"article"}>
        <Article id={id} test={"Digits"}/>
      </div>
    );
  } else {
    return (
      <NotFound/>
    );
  }
};
