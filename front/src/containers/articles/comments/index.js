import { useQuery } from "react-query";

import { getCommentsForArticle } from "../api/crud";
import { CommentsListContainer } from "../commentsList";

export const CommentsContainer = ({ articleId }) => {
  const { data, refetch } = useQuery(`comments${articleId}`, () => getCommentsForArticle(articleId));
  const commentsForArticle = data?.data;

  return (
    <>
      {commentsForArticle?.map((comment) => (
        <CommentsListContainer
          key={comment.CommentID}
          comment={comment}
          refetch={refetch}
        />
      ))}
    </>
  );
};

CommentsContainer.propTypes = {
  // to do
};
