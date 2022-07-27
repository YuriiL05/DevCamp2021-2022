import { useMutation, useQuery } from "react-query";

import { addLike, createNewComment } from "../api/crud";
import { Comments } from "../../../components/comments";
import { getUser, getUserByCommentId } from "../../users/api/crud";

export const CommentsListContainer = ({ comment, refetch }) => {
  const { UserID, ReplyToCommentID } = comment;

  const { data } = useQuery(`user${UserID}`, () => getUser(UserID));
  const user = data?.data;

  const { data: toUser, isFetched } = useQuery(`user${ReplyToCommentID}`, () => getUserByCommentId(ReplyToCommentID));
  const replyToUser = toUser?.data;

  const { mutateAsync: replyComment } = useMutation(`addLike`, (data) => createNewComment(data))

  const handleReplyComment = async (replyCommentData) => {
    await replyComment(replyCommentData);
  }

  refetch();

  return (
    <>
      {user && isFetched && <Comments comment={comment}
                                      user={user}
                                      replyToUser={replyToUser}
                                      handleReplyComment={handleReplyComment}
      />}
    </>
  );
};

CommentsListContainer.propTypes = {
  // to do
};