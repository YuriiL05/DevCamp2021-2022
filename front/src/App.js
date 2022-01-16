import { Route, Routes } from "react-router-dom";

import { BodyContainer } from './containers/body';
import { ArticlesContainer } from "./containers/articles";
import { ArticleContainer } from "./containers/article";
import { AddArticle } from "./components/addArticle";
import { ProfileContainer } from "./containers/profile";
import { DateContainer } from "./containers/date";
import { NotFound } from "./components/404";

import './App.css';

export const App = () => {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<BodyContainer/>}>
            <Route index element={<ArticlesContainer/>}/>
            <Route path="articles/:id" element={<ArticleContainer/>}/>
            <Route path="articles/new" element={<AddArticle/>}/>
            <Route path="profile" element={<ProfileContainer user={{
              name: 'test',
              age: '23',
              avatar: {
                file: {
                  id: 1,
                  name: '123.jpg',
                  path: '/files/1.jpg'
                }
              },
              files: [
                {
                  id: 1,
                  name: '123.jpg',
                  path: '/files/1.jpg'
                },
                {
                  id: 1,
                  name: '123.jpg',
                  path: '/files/1.jpg'
                }],
              addrr: {
                main: {
                  line1: 'test',
                  line2: 'test',
                  city: 'test',
                  zip: 1234
                },
                alt: {
                  line1: 'test',
                  line2: 'test',
                  city: 'test',
                  zip: 1234
                }
              },
              friends: [
                {
                  name: 'test',
                  age: '23',
                  avatar: {
                    file: {
                      id: 1,
                      name: '123.jpg',
                      path: '/files/1.jpg'
                    }
                  },
                  files: [
                    {
                      id: 1,
                      name: '123.jpg',
                      path: '/files/1.jpg'
                    },
                    {
                      id: 1,
                      name: '123.jpg',
                      path: '/files/1.jpg'
                    }],
                  addrr: {
                    main: {
                      line1: 'test',
                      line2: 'test',
                      city: 'test',
                      zip: 1234
                    },
                    alt: {
                      line1: 'test',
                      line2: 'test',
                      city: 'test',
                      zip: 1234
                    }
                  }
                }
              ]
            }}/>}/>
            <Route path="date/:date" element={<DateContainer/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </div>
  );
};
