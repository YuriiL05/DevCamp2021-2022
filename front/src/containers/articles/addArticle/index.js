import { AddOrEditArticle } from "../../../components/addOrEditArticle";
import { useMutation } from "react-query";
import React from "react";
import { postAddArticle } from "../api/crud";
import { Loading } from "../../../components/loading";
import PropTypes from "prop-types";

export const AddArticleContainer = ({ openArtAdd, setOpenArtAdd, accessLevels }) => {
  //User Id should be set after Login
  const UserID = 1;
  const date = new Date();

  const handleCloseArt = () => {
    setOpenArtAdd(false);
  };

  const { mutate, isLoading } = useMutation( 'newArticle', (data) => postAddArticle(data));

  const addArticle = (values) => {
    mutate({...values, UserID, date});
    handleCloseArt();
  };

  return (
    <>
      {isLoading && <Loading/>}
      <AddOrEditArticle open={openArtAdd}
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
