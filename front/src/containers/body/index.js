import { useState } from "react";
import { Outlet } from "react-router-dom";

import { HeaderContainer } from "../header";

import './style.css';
import ErrorBoundary from "../../components/ErrorBoundary";
import { AddArticleContainer } from "../articles/addArticle";
import { useQuery } from "react-query";
import { getAccessLevels } from "../articles/api/crud";
import { Loading } from "../../components/loading";
import userContext from "../../contexts/userContext";

export const BodyContainer = () => {
  const [openArtAdd, setOpenArtAdd] = useState(false);
  const [userData, setUserData] = useState({authenticated: false, user: null, setUserData: () => {}});

  const { isFetching, refetch, data, isFetched } = useQuery('accessLevels', () => getAccessLevels());
  const accessLevels = data?.data;

  return (
    <>
      <userContext.Provider value={userData}>
        <HeaderContainer setOpenArtAdd={setOpenArtAdd}/>
        <div className={"bodyContent"}>
          <div className={"content"}>
            <ErrorBoundary>
              {isFetching && <Loading/>}
              {isFetched && openArtAdd && <AddArticleContainer openArtAdd={openArtAdd}
                                                               setOpenArtAdd={setOpenArtAdd}
                                                               accessLevels={accessLevels}/>}
              {isFetched && <Outlet context={accessLevels}/>}
            </ErrorBoundary>
          </div>
        </div>
      </userContext.Provider>
    </>
  );
};
