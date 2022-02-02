import { AddArticle } from "../../../components/addOrEditArticle";
import { useMutation } from "react-query";
import React from "react";
import { postAddArticle } from "../api/crud";
import { Loading } from "../../../components/loading";

export const AddArticleContainer = ({ openArtAdd, setOpenArtAdd }) => {
  const UserID = 1;
  const date = new Date();

  const handleCloseArt = () => {
    setOpenArtAdd(false);
  };

  const { mutate, isLoading } = useMutation( 'newArticle', (data) => postAddArticle(data));

  const addArticle = (values) => {
    console.log(values);
    mutate({...values, UserID, date});
    handleCloseArt();
  };

  return (
    <>
      {isLoading && <Loading/>}
      <AddArticle open={openArtAdd} handleClose={handleCloseArt} submitArticle={addArticle} article={undefined}/>
    </>
  );
};
