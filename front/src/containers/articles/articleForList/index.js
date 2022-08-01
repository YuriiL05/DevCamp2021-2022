import React from "react";
import { useMutation, useQuery } from "react-query";
import { Loading } from "../../../components/loading";
import { ArticleForList } from "../../../components/articleForList";
import { getUser } from "../../users/api/crud";
import { createNewComment, getCommentsForArticle } from "../api/crud";

export const ArticleForListContainer = ({ article }) => {

  const { UserID, ArticleID } = article;

  const { isFetching, data } = useQuery(`user${UserID}`, () => getUser(UserID));
  const user = data?.data;

  const { data: comments, isFetched } = useQuery(`comments${ArticleID}`, () => getCommentsForArticle(ArticleID));
  const numberOfComments = comments?.data?.length;

  const { mutateAsync: addComment } = useMutation(`addLike`, (data) => createNewComment(data))

  const handleAddNewComment = async (newCommentData) => {
    const newComment = {
      ...newCommentData,
      ArticleID
    }
    await addComment(newComment);
  }

  return (
    <>
      {isFetching && <Loading/>}
      {user && isFetched && <ArticleForList article={article}
                               user={user}
                               handleAddNewComment={handleAddNewComment}
                               numberOfComments={numberOfComments}
      />}
    </>
  );
};

