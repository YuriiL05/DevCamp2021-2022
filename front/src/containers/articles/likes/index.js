import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";

import { addLike, getLikesForArticle, removeLikeByArticleId } from "../api/crud";
import userContext from "../../../contexts/userContext";
import { Likes } from "../../../components/likes";

export const LikesContainer = ({ article }) => {
  const { ArticleID } = article;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { id: UserID } = useContext(userContext).user;

  const { mutateAsync: addNewLike } = useMutation(`addLike`, (ArticleID) => addLike(ArticleID))
  const { mutateAsync: removeLike } = useMutation(`removeLike`, (ArticleID) => removeLikeByArticleId(ArticleID))

  const { data } = useQuery(`likes${ArticleID}`, () => getLikesForArticle(ArticleID));
  const likesForArticle = data?.data;

  if (likesCount === 0 && likesForArticle?.length > 0) {
    setLikesCount(likesForArticle.length);
    console.log(likesForArticle);
  }

  if (likesForArticle?.length > 0 && !liked) {
    likesForArticle.forEach((like) => {
      if (like.UserID === UserID) {
        setLiked(true);
        console.log('liked from DB');
      }
    });
  }

  const handleLike = async (event) => {
    setLiked(event.target.checked);
    if (event.target.checked) {
      setLikesCount(likesCount + 1)
      console.log('add count');
      await addNewLike(ArticleID)
    } else {
      await removeLike(ArticleID)
      likesForArticle.forEach((like, index) => {
        if (like.UserID === UserID) {
          likesForArticle.slice(index, index)
        }
      });
      setLikesCount(likesCount - 1)
      console.log('remove count');
    }
  };

  return (
    <>
      <Likes handleLike={handleLike}
             liked={liked}
             likesCount={likesCount}
      />
    </>
  );
};

