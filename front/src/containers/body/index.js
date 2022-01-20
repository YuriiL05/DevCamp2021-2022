import React from 'react';
import { Outlet } from "react-router-dom";

import { HeaderContainer } from "../header";

import './style.css';
import ErrorBoundary from "../../components/ErrorBoundary";

export const BodyContainer = () => {

   return (
    <>
      <HeaderContainer/>
      <div className={"bodyContent"}>
        <div className={"content"}>
          <ErrorBoundary>
            <Outlet/>
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};
