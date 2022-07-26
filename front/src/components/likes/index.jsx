import PropTypes from 'prop-types';

import "./style.css"
import { Checkbox, FormControlLabel } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

export const Likes = ( { liked, likesCount, handleLike } ) => {

  return (
    <>
      <FormControlLabel
        control={
          <Checkbox checked={liked}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    onChange={handleLike}
          />
        }
        label={`${likesCount}`}
      />
    </>
  );
};

Likes.propTypes = {
  liked: PropTypes.bool.isRequired,
  likesCount: PropTypes.number.isRequired,
  handleLike: PropTypes.func.isRequired,
};