import React from 'react';

import './style.css';

export const HeaderContainer = ({ changePage, pages }) => {
  return (
    <>
      <header>
        <button onClick={changePage(pages.articles)}> {pages.articles}</button>
        <button onClick={changePage(pages.addArticle)}>{pages.addArticle}</button>
        <button onClick={changePage(pages.profile)}>{pages.profile}</button>
      </header>
    </>
  );
};