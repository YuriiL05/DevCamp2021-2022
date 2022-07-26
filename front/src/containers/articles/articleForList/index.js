import React from "react";
import { useQuery } from 'react-query';
import { Loading } from "../../../components/loading";
import { ArticleForList } from "../../../components/articleForList";
import { LikesContainer } from "../likes";
import { Box } from "@mui/material";
import { getUser } from "../../users/api/crud";

export const ArticleForListContainer = ({ article }) => {

  const { UserID } = article;

  const { isFetching, data } = useQuery(`user${UserID}`, () => getUser(UserID));
  const user = data?.data;

  return (
    <>
      {isFetching && <Loading/>}
      <Box>
          {user && <ArticleForList article={article} user={user}/>}
          {user && <LikesContainer article={article}/>}
      </Box>
    </>
  );
};

