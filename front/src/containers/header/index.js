import React from 'react';

import './style.css';

export const HeaderContainer = ({ changePage, pages }) => {

  const selectArticlesPage = () => { changePage(pages.articles) };
  const selectAddArticlePage = () => { changePage(pages.addArticle) };
  const selectProfilePage = () => { changePage(pages.profile) };


  return (
    <>
      <header>
        <button onClick={selectArticlesPage}> {pages.articles}</button>
        <button onClick={selectAddArticlePage}>{pages.addArticle}</button>
        <button onClick={selectProfilePage}>{pages.profile}</button>
      </header>
    </>
  );
};