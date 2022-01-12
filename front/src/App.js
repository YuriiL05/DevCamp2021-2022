import { HeaderContainer } from './containers/header';
import { BodyContainer } from './containers/body';

import './App.css';

export const App = () => {

  const pages = {
    articles: 'articles',
    newArticle: 'new-article',
    profile: 'profile'
  };

  // const [page, setPage] = useState(pages.articles);
  //
  // const changePage = (selectedPage) => () => {
  //   setPage(selectedPage);
  // };

  return (
      <div className="App">
        <HeaderContainer pages={pages}/>
        <BodyContainer pages={pages}/>}/>
      </div>
  );
};
