import { Route, Routes } from "react-router-dom";

import { BodyContainer } from './containers/body';
import { ArticlesContainer } from "./containers/articles";
import { ArticleContainer } from "./containers/articles/article";
import { AddArticle } from "./components/addOrEditArticle";
import { UsersContainer } from "./containers/users";
import { ProfileContainer } from "./containers/profile";
import { DateContainer } from "./containers/date";
import { NotFound } from "./components/404";
import { UserContainer } from "./containers/users/user";

import './App.css';

export const App = () => {

  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<BodyContainer/>}>
            <Route index element={<ArticlesContainer/>}/>
            <Route path="articles/:id" element={<ArticleContainer/>}/>
            <Route path="users" element={<UsersContainer/>}/>
            <Route path="users/:id" element={<UserContainer/>}/>
            <Route path="profile" element={<ProfileContainer/>}/>
            <Route path="date/:date" element={<DateContainer/>}/>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </div>
  );
};
