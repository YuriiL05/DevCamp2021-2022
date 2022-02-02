import { useState } from "react";
import {  Outlet } from "react-router-dom";
import { EditArticleContainer } from "./editArticle";

export const ArticlesContainer = () => {
  const [openArtEdit, setOpenArtEdit] = useState(false);
  const [articleId, setArticleId] = useState(null);

  const handleArticleEdit = (ArticleID) => () => {
    setArticleId(ArticleID);
    handleOpenEditArt();
  }

  const handleOpenEditArt = () => {
    setOpenArtEdit(true);
  };

  const handleCloseEditArt = () => {
    setOpenArtEdit(false);
  };

  return (
    <>
      {openArtEdit && <EditArticleContainer openArtEdit={openArtEdit} handleCloseEditArt={handleCloseEditArt} articleId={articleId}/>}
      <Outlet context={handleArticleEdit}/>
    </>
  );
};
