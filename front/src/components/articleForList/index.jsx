import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css"

export const ArticleForList = ( { articleId, title, date } ) => {
  return (
    <>
      <Link to={`/articles/${articleId}`} className={"articleList"}>
        <li>Title: {title} {date}</li>
      </Link>
    </>
  );
};

ArticleForList.propTypes = {
  articleId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};