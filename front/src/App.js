import { Route, Routes } from "react-router-dom";

import { BodyContainer } from './containers/body';
import { ArticlesContainer } from "./containers/articles";
import { ArticleContainer } from "./containers/articles/article";
import { UsersContainer } from "./containers/users";
import { ProfileContainer } from "./containers/profile";
import { NotFound } from "./components/404";
import { UserContainer } from "./containers/users/user";

import './App.css';
import { ArticlesListContainer } from "./containers/articles/articlesList";

export const App = () => {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<BodyContainer/>}>
            <Route path="/" element={<ArticlesContainer/>}>
              <Route index element={<ArticlesListContainer/>}/>
              <Route path="articles/:id" element={<ArticleContainer/>}/>
            </Route>
            <Route path="users" element={<UsersContainer/>}/>
            <Route path="users/:id" element={<UserContainer/>}/>
            <Route path="profile" element={<ProfileContainer/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </div>
  );
};
