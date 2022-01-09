import React from 'react';

import { AddArticle } from '../../components/addArticle';
import { Articles } from '../../components/articles';
import { Profile } from '../../components/profile';

import './style.css';

export const BodyContainer = ({ page, pages }) => {

  return (
    <div className={"body-content"}>
      {page === pages.articles && <Articles/>}
      {page === pages.addArticle && <AddArticle/>}
      {page === pages.profile && <Profile/>}
    </div>
  );
};
