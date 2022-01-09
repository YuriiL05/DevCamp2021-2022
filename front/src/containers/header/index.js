import React from 'react';

export const HeaderContainer = ({ setPage }) => {

  const pages = ['Articles', 'Add Article', 'Profile'];

  const changePage = (selectedPage) => {
    setPage(+selectedPage.target.value)
  };

  return (
    <>
      <header>
        <button onClick={changePage} value={0}>{pages[0]}</button>
        <button onClick={changePage} value={1}>{pages[1]}</button>
        <button onClick={changePage} value={2}>{pages[2]}</button>
      </header>
    </>
  );
};