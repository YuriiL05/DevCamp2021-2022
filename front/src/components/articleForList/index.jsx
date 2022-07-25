import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css"
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { useContext, useState } from "react";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useMutation, useQuery } from "react-query";
import { addLike, getLikesForArticle, removeLikeByArticleId } from "../../containers/articles/api/crud";
import userContext from "../../contexts/userContext";

export const ArticleForList = ( { article, handleArticleEdit } ) => {
  const { ArticleID, Title, CreateDate } = article;
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { id: UserID } = useContext(userContext).user;

  const { mutateAsync: addNewLike, isLoading: loadAdding } = useMutation(`addLike`, (ArticleID) => addLike(ArticleID))
  const { mutateAsync: removeLike, isLoading: loadRemoving } = useMutation(`removeLike`, (ArticleID) => removeLikeByArticleId(ArticleID))

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
    <div className={"articleList"}>
      <Link to={`/articles/${ArticleID}`} className={"articleListLink"}>
        <div>
          <p>#{ArticleID} <br/>
            Title: {Title} <br/>
            CreateDate {CreateDate.split('T')[0]}
          </p>
        </div>
      </Link>
      <FormControlLabel
        control={
          <Checkbox checked={liked}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={handleLike}
                    disabled={loadRemoving || loadAdding}
          />
        }
        label={`${likesCount}`}
      />
      <Button variant="outlined" onClick={handleArticleEdit(ArticleID)}>
        Edit Article
      </Button>
    </div>
  );
};

ArticleForList.propTypes = {
  article: PropTypes.shape({
    ArticleID: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    CreateDate: PropTypes.string.isRequired
  }),
  handleArticleEdit: PropTypes.func.isRequired
};