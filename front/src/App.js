import { Route, Routes } from "react-router-dom";

import { BodyContainer } from './containers/body';
import { ArticlesContainer } from "./containers/articles";
import { ArticleContainer } from "./containers/articles/article";
import { UsersContainer } from "./containers/users";
import { ProfileContainer } from "./containers/profile";
import { NotFound } from "./components/404";
import { UserContainer } from "./containers/users/user";
import userContext from "./contexts/userContext";

import './App.css';
import { ArticlesListContainer } from "./containers/articles/articlesList";
import { LoginContainer } from "./containers/login";
import ProtectedRoute from "./containers/authRouters/protectedRoute";
import { useState } from "react";
import GuestRoute from "./containers/authRouters/guestRoute";

export const App = () => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('authUserData')));
  const userDataForContext = { ...userData, setUserData };

  return (
      <div className="App">
        <userContext.Provider value={userDataForContext}>
        <Routes>
          <Route path="/" element={<BodyContainer/>}>
            <Route element={<ProtectedRoute/>}>
              <Route path="/" element={<ArticlesContainer/>}>
                <Route index element={<ArticlesListContainer/>}/>
                <Route path="articles/:id" element={<ArticleContainer/>}/>
              </Route>
              <Route path="users" element={<UsersContainer/>}/>
              <Route path="users/:id" element={<UserContainer/>}/>
              <Route path="profile" element={<ProfileContainer/>}/>
            </Route>
            <Route element={<GuestRoute/>}>
              <Route path="login" element={<LoginContainer/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}/>
          </Route>
        </Routes>
        </userContext.Provider>
      </div>
  );
};
