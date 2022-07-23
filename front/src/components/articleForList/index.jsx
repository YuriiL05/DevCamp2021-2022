import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css"
import { Button } from "@mui/material";
import React from "react";

export const ArticleForList = ( { article, handleArticleEdit } ) => {
  const { ArticleID, Title, CreateDate } = article;

  return (
    <div className={"articleList"}>
      <Link to={`/articles/${ArticleID}`} className={"articleListLink"}>
        <div>
          <p>#{ArticleID} <br/>
            Title: {Title} <br/>
            CreateDate {CreateDate.split('T')[0]}</p>
        </div>
      </Link>
      <Button variant="outlined" onClick={handleArticleEdit(ArticleID)}>
        Edit Article
      </Button>
    </div>
  );
};

ArticleForList.propTypes = {
  article: PropTypes.shape({
    ArticleID: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    CreateDate: PropTypes.string.isRequired
  }),
  handleArticleEdit: PropTypes.func.isRequired
};