import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css"

export const ArticleForList = ( { article } ) => {
  return (
    <>
      <Link to={`/articles/${article.articleId}`} className={"articleList"}>
        <li>{article.articleTitle}</li>
      </Link>
    </>
  );
};

ArticleForList.propTypes = {
  article: PropTypes.shape({
    articleId: PropTypes.number.isRequired,
    articleTitle: PropTypes.string.isRequired
  })
};

ArticleForList.defaultProps = {
  article: {
    articleId: null,
    articleTitle: "N/A"
  }
}