import React, { useState } from "react";

import PropTypes from "prop-types";
import { Header } from "../../components/header";
import { LoginHeaderContainer } from "../loginHeader";

//Users button should be removed
export const HeaderContainer = ({ setOpenArtAdd }) => {
  const [auth, setAuth] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const handleClickOpenArt = () => {
    setOpenArtAdd(true);
  };

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleClickCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleAuth = () => {
    setAuth(true);
    handleClickCloseLogin();
  };

  return (
    <>
      <Header handleClickOpenArt={handleClickOpenArt}
              handleClickOpenLogin={handleClickOpenLogin}
              auth={auth}
      />
      <LoginHeaderContainer
          handleClickCloseLogin={handleClickCloseLogin}
          openLogin={openLogin}
          handleAuth={handleAuth}
      />
    </>
  );
};

HeaderContainer.propTypes = {
  setOpenArtAdd: PropTypes.func.isRequired
}