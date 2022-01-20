import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css"

export const ArticleForList = ( { articleId, title, date } ) => {
  return (
    <div className={"articleList"}>
      <Link to={`/articles/${articleId}`} className={"articleListLink"}>
        <div>
          <p>#{articleId} <br/>
            Title: {title} <br/>
            Date {date.split('T')[0]}</p>
        </div>
      </Link>
    </div>
  );
};

ArticleForList.propTypes = {
  articleId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired
};