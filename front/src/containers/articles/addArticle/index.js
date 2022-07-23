import { useMutation } from "react-query";
import React from "react";
import { postAddArticle } from "../api/crud";
import { Loading } from "../../../components/loading";
import PropTypes from "prop-types";
import { AddOrEditArticleContainer } from "../addOrEditArticle";
import constants from "../../../constants"

export const AddArticleContainer = ({ openArtAdd, setOpenArtAdd }) => {

  const handleCloseArt = () => {
    setOpenArtAdd(false);
  };

  const { mutate, isLoading } = useMutation( 'newArticle', (data) => postAddArticle(data));

  const addArticle = (values) => {
    const articleData = {
      Title: values.Title,
      Text: values.Text,
      AccessLevelID: values.AccessLevel.value,
      file: values?.file
    }

    mutate(articleData);
    handleCloseArt();
  };

  return (
    <>
      {isLoading && <Loading/>}
      <AddOrEditArticleContainer open={openArtAdd}
                                 handleClose={handleCloseArt}
                                 submitArticle={addArticle}
                                 article={undefined}
                                 accessLevels={constants.AccessLevels}/>
    </>
  );
};

AddArticleContainer.propTypes = {
  openArtAdd: PropTypes.bool.isRequired,
  setOpenArtAdd: PropTypes.func.isRequired
}
