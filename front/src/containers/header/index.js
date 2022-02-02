import React from 'react';
import { Link } from "react-router-dom";

import './style.css';
import { Button } from "@mui/material";

//Users button should be removed
export const HeaderContainer = ({ setOpenArtAdd, setOpenArtEdit }) => {

  const handleOpenEditArt = () => {
    setOpenArtEdit(true);
  }

  const handleClickOpenArt = () => {
    setOpenArtAdd(true);
  };

  return (
    <>
      <header>
        <Link to="/" className={"btn"}>Articles</Link>
        <Button variant="outlined" onClick={handleClickOpenArt}>
          Add Article
        </Button>
        <Button variant="outlined" onClick={handleOpenEditArt}>
          Edit Article
        </Button>
        <Link to="users" className={"btn"}>Users</Link>
        <Link to="profile" className={"btn"}>Profile</Link>
      </header>
    </>
  );
};