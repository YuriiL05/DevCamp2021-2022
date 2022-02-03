import { Button } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const ArticleValidation = require("../../propsValidation/ArticleValidation")

export const Article = ( { article, handleArticleEdit } ) => {
  const { ArticleID, Title, Body, Date} = article;

  return (
    <div className={"article"}>
      <p>Article# {ArticleID}</p>
      <Button variant="outlined" onClick={handleArticleEdit(ArticleID)}>
        Edit Article
      </Button>
      <p>Title: {Title}</p>
      <p>Text:</p>
      <p>{Body}</p>
      <p>{Date.split('T')[0]}</p>
      <p>Comments: Test comment</p>
    </div>
  );
};

Article.propTypes = {
  article: PropTypes.shape(ArticleValidation).isRequired,
  handleArticleEdit: PropTypes.func.isRequired
};