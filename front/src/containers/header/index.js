import React from 'react';
import { Link } from "react-router-dom";

import './style.css';

export const HeaderContainer = () => {

  return (
    <>
      <header>
        <Link to="/" className={"btn"}>Articles</Link>
        <Link to="articles/new" className={"btn"}>New Article</Link>
        <Link to="profile" className={"btn"}>Profile</Link>
      </header>
    </>
  );
};