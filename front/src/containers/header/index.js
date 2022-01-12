import React from 'react';
import { Link } from "react-router-dom";

import './style.css';

export const HeaderContainer = ({ pages }) => {

  return (
    <>
      <header>
        <Link to={pages.articles} className={"btn"}>Articles</Link>
        <Link to={pages.newArticle} className={"btn"}>New Article</Link>
        <Link to={pages.profile} className={"btn"}>Profile</Link>
      </header>
    </>
  );
};