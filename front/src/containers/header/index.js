import React from 'react';
import { Link } from "react-router-dom";

import './style.css';
import { Button, Stack } from "@mui/material";
import PropTypes from "prop-types";

//Users button should be removed
export const HeaderContainer = ({ setOpenArtAdd }) => {

  const handleClickOpenArt = () => {
    setOpenArtAdd(true);
  };

  return (
    <>
      <header>
        <Stack spacing={2} direction="row">
          <Link to="/" className={"btn"}>
            <Button variant="contained">Articles</Button>
          </Link>
          <Button variant="outlined" onClick={handleClickOpenArt}>Add Article</Button>
          <Link to="users" className={"btn"}>
            <Button variant="contained">Users</Button>
          </Link>
          <Link to="profile" className={"btn"}>
            <Button variant="contained">Profile</Button>
          </Link>
        </Stack>
      </header>
    </>
  );
};

HeaderContainer.propTypes = {
  setOpenArtAdd: PropTypes.func.isRequired
}