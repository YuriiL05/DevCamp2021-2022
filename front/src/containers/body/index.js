import React from 'react';
import {
  Routes,
  Route
} from "react-router-dom";

import { AddArticle } from '../../components/addArticle';
import { Articles } from '../../components/articles';
import { Profile } from '../../components/profile';
import { ArticleContainer } from '../article';
import { NotFound } from "../../components/404";
import { Home } from "../../components/home";

import './style.css';
import { DateContainer } from "../date";

export const BodyContainer = ( {pages} ) => {

   return (
    <div className={"body-content"}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path={pages.articles} element={<Articles/>}>
            <Route path=":id" element={<ArticleContainer/>}/>
          </Route>
          <Route path={pages.newArticle} element={<AddArticle/>}/>
          <Route path={pages.profile} element={<Profile/>}/>
          <Route path="/date/:date" element={<DateContainer/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
    </div>
  );
};
