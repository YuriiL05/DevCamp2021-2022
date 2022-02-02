import React from 'react';
import { Outlet } from "react-router-dom";

import { HeaderContainer } from "../header";

import './style.css';
import ErrorBoundary from "../../components/ErrorBoundary";
import { AddArticleContainer } from "../articles/addArticle";
import { EditArticleContainer } from "../articles/editArticle";

export const BodyContainer = () => {
  const [openArtAdd, setOpenArtAdd] = React.useState(false);
  const [openArtEdit, setOpenArtEdit] = React.useState(false);


   return (
    <>
      <HeaderContainer setOpenArtAdd={setOpenArtAdd} setOpenArtEdit={setOpenArtEdit}/>
      <div className={"bodyContent"}>
        <div className={"content"}>
          <ErrorBoundary>
            <AddArticleContainer openArtAdd={openArtAdd} setOpenArtAdd={setOpenArtAdd}/>
            <Outlet/>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
