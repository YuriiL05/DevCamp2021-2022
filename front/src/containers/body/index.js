import { useState } from "react";
import { Outlet } from "react-router-dom";

import { HeaderContainer } from "../header";

import './style.css';
import ErrorBoundary from "../../components/ErrorBoundary";
import { AddArticleContainer } from "../articles/addArticle";

export const BodyContainer = () => {
  const [openArtAdd, setOpenArtAdd] = useState(false);

  return (
    <>

        <HeaderContainer setOpenArtAdd={setOpenArtAdd}/>
        <div className={"bodyContent"}>
          <div className={"content"}>
            <ErrorBoundary>
              {openArtAdd && <AddArticleContainer openArtAdd={openArtAdd}
                                                  setOpenArtAdd={setOpenArtAdd}
              />}
              <Outlet />
            </ErrorBoundary>
          </div>
        </div>
    </>
  );
};
