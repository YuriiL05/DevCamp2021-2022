import React from 'react';
import { Outlet } from "react-router-dom";

import { HeaderContainer } from "../header";

import './style.css';

export const BodyContainer = () => {

   return (
    <>
      <HeaderContainer/>
      <div className={"content"}>
        <Outlet/>
      </div>
    </>
  );
};
