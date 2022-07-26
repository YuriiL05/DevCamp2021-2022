import PropTypes from 'prop-types';
import { Link, useOutletContext } from "react-router-dom";

import "./style.css"
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia, Collapse,
  IconButton, Menu, MenuItem,
  Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from "@mui/material/colors";
import { ExpandMore } from "@mui/icons-material";
import React from "react";
import UserValidation from "../../propsValidation/UserValidation"


function ExpandMoreIcon() {
  return null;
}

export const ArticleForList = ( { article, user } ) => {
  const handleArticleEdit = useOutletContext();
  const { ArticleID, Title, CreateDate, File } = article;
  const { FirstName, LastName, Avatar: ava } = user;
  const [anchorElCard, setAnchorElCard] = React.useState(null);

  const handleOpenCardMenu = (event) => {
    setAnchorElCard(event.currentTarget);
  };

  const handleCloseCardMenu = () => {
    handleArticleEdit(ArticleID);
    setAnchorElCard(null);
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {FirstName} {LastName}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={handleOpenCardMenu}>
              <MoreVertIcon />
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElCard}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElCard)}
                onClose={handleCloseCardMenu}
              >
                <MenuItem key='Edit' onClick={handleCloseCardMenu}>
                  Edit
                </MenuItem>
              </Menu>
            </IconButton>
          }
          title={FirstName + " " + LastName}
          subheader={CreateDate}
        />
        {File && <CardMedia
          component="img"
          height="194"
          image={File}
          alt="Paella dish"
        />}
        <CardContent>
          <Link to={`/articles/${ArticleID}`} className={"articleListLink"}>
            <Typography variant="body2" color="text.secondary">
              {Title}
            </Typography>
          </Link>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <ExpandMore
            //expand={expanded}
            //onClick={handleExpandClick}
           // aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse //in={expanded}
                  timeout="auto"
                  unmountOnExit>
          <CardContent>
            <Typography paragraph>Comments:</Typography>
            <Typography paragraph>
             Test
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

ArticleForList.propTypes = {
  article: PropTypes.shape({
    ArticleID: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    CreateDate: PropTypes.string.isRequired
  }),
  user: PropTypes.shape(UserValidation),
};