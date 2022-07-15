import React, { useContext } from "react";

import PropTypes from "prop-types";
import userContext from "../../contexts/userContext";
import { useMutation } from "react-query";
import { postGoogleAuth } from "../profile/api/crud";
import { Login } from "../../components/login";

export const LoginContainer = ({ handleClickCloseLogin, openLogin, handleAuth }) => {
  const { setUserData } = useContext(userContext);

  const { mutateAsync, data } = useMutation(`googleAuth`, (data) => postGoogleAuth(data));

  const handleGoogleAuth = async (response) => {
    try {
      await mutateAsync({ access_token: response.accessToken })
    } catch (error) {
      console.error(error)
      return;
    }
    setUserData(
      {
        authenticated: true,
        user: { accessToken: data?.data?.accessToken },
        setUserData
      });
    handleAuth();
  }

  const handleGoogleAuthFail = (response) => {
    console.log(response);
    //Notification
  }

  return (
    <>
      <Login handleClickCloseLogin={handleClickCloseLogin}
             openLogin={openLogin}
             handleGoogleAuth={handleGoogleAuth}
             handleGoogleAuthFail={handleGoogleAuthFail}/>
    </>
  );
};

LoginContainer.propTypes = {
  handleClickCloseLogin: PropTypes.func.isRequired,
  openLogin: PropTypes.bool.isRequired,
  handleAuth: PropTypes.func.isRequired,
}