import { useState } from 'react';

import { HeaderContainer } from './containers/header';
import { BodyContainer } from './containers/body';

import './App.css';

export const App = () => {

  const pages = {
    articles: 'Articles',
    addArticle: 'Add Article',
    profile: 'Profile'
  };

  const [page, setPage] = useState(pages.articles);

  const changePage = (selectedPage) => {
    setPage(selectedPage)
  };

  return (
    <div className="App">
      <HeaderContainer changePage={changePage} pages={pages}/>
      <BodyContainer page={page} pages={pages}/>
    </div>
  );
};
