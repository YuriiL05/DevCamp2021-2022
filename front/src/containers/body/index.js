import React from 'react';

import {AddArticle} from '../../components/addArticle';
import {Articles} from '../../components/articles';
import {Profile} from '../../components/profile';

export const BodyContainer = ({ page }) => {

  return (
    <>
      {page === 0 && <Articles/>}
      {page === 1 && <AddArticle/>}
      {page === 2 && <Profile/>}
    </>
  );
};
