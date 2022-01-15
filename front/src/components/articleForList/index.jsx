import { Link } from "react-router-dom";

import "./style.css"

export const ArticleForList = ( { article } ) => {
  return (
    <>
      <Link key={article.articleId} to={`/articles/${article.articleId}`} className={"articleList"}>
        <li>{article.articleTitle}</li>
      </Link>
    </>
  );
};