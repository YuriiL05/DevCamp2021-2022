import {useState} from 'react';

import { HeaderContainer } from './containers/header';
import { BodyContainer } from './containers/body';

import './App.css';

export const App = () => {

  const [page, setPage] = useState(0);

  return (
    <div className="App">
      <HeaderContainer setPage={setPage}/>
      <BodyContainer page={page}/>
    </div>
  );
};
