import { useMutation } from "react-query";
import React from "react";
import { postAddArticle } from "../api/crud";
import { Loading } from "../../../components/loading";
import PropTypes from "prop-types";
import { AddOrEditArticleContainer } from "../addOrEditArticle";

export const AddArticleContainer = ({ openArtAdd, setOpenArtAdd, accessLevels }) => {
  //User Id should be set after Login
  const UserID = 1;
  const date = new Date();

  const handleCloseArt = () => {
    setOpenArtAdd(false);
  };

  const { mutate, isLoading } = useMutation( 'newArticle', (data) => postAddArticle(data));

  const addArticle = (values) => {
    const articleData = {
      UserID,
      Title: values.Title,
      Body: values.Body,
      AccessLevelID: values.AccessLevel.value,
      Date: date,
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
                                 accessLevels={accessLevels}/>
    </>
  );
};

AddArticleContainer.propTypes = {
  openArtAdd: PropTypes.bool.isRequired,
  setOpenArtAdd: PropTypes.func.isRequired,
  accessLevels: PropTypes.array.isRequired
}
