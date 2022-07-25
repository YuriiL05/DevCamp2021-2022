import React, { useState } from "react";

import PropTypes from "prop-types";
import { Header } from "../../components/header";
import { LoginHeaderContainer } from "../loginLightBox";

export const HeaderContainer = ({ setOpenArtAdd }) => {
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

  return (
    <>
      <Header handleClickOpenArt={handleClickOpenArt}
              handleClickOpenLogin={handleClickOpenLogin}
      />
      {openLogin &&
        <LoginHeaderContainer
          handleClickCloseLogin={handleClickCloseLogin}
          openLogin={openLogin}
        />
      }
    </>
  );
};

HeaderContainer.propTypes = {
  setOpenArtAdd: PropTypes.func.isRequired
}