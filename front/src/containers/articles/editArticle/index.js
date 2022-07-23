import { useMutation, useQuery } from "react-query";
import React from "react";
import { putEditArticle, getArticle } from "../api/crud";
import { Loading } from "../../../components/loading";
import PropTypes from "prop-types";
import { AddOrEditArticleContainer } from "../addOrEditArticle";

export const EditArticleContainer = ({ articleId, openArtEdit, handleCloseEditArt }) => {

  const { isFetching, data, isFetched } = useQuery(`article${articleId}`, () => getArticle(articleId));
  const article = data?.data;

  const { mutate } = useMutation( 'editArticle', (data) => putEditArticle(data));

  const editArticle = (values) => {
    const articleData = {
      ArticleID: values.ArticleID,
      Title: values.Title,
      Text: values.Text,
      AccessLevelID: values.AccessLevel.value,
      file: values.file
    }

    mutate(articleData);
    handleCloseEditArt();
  };

  return (
    <>
      {isFetching && <Loading/>}
      {isFetched && <AddOrEditArticleContainer open={openArtEdit}
                                      handleClose={handleCloseEditArt}
                                      submitArticle={editArticle}
                                      article={article}
      />
      }
    </>
  );
};

EditArticleContainer.propTypes = {
  articleId: PropTypes.number.isRequired,
  openArtEdit: PropTypes.bool.isRequired,
  handleCloseEditArt: PropTypes.func.isRequired
}