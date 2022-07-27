import PropTypes from 'prop-types';
import { Link, useOutletContext } from "react-router-dom";

import "./style.css"
import {
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia, Collapse, Grid,
  IconButton, Menu, MenuItem,
  Typography
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import UserValidation from "../../propsValidation/UserValidation"
import { CommentsContainer } from "../../containers/articles/comments";
import { LikesContainer } from "../../containers/articles/likes";
import UserIcon from "../userIcon"
import CardOverflow from '@mui/joy/CardOverflow';
import { SendOutlined } from "@mui/icons-material";
import { Input } from "@mui/joy";
import * as React from "react";


export const ArticleForList = ( { article, user, handleAddNewComment, numberOfComments } ) => {
  const handleArticleEdit = useOutletContext();
  const { ArticleID, Title, CreateDate, File, Text } = article;
  const { FirstName, LastName, Avatar: ava } = user;

  const [anchorElCard, setAnchorElCard] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState('');

  const handleOpenCardMenu = (event) => {
    setAnchorElCard(event.currentTarget);
  };

  const handleCloseCardMenu = () => {
    handleArticleEdit(ArticleID);
    setAnchorElCard(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSendComment = () => {
    handleAddNewComment({ Text: commentValue })
    setExpanded(true);
  };

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  return (
    <>
      <Card sx={{ m: 7}}>
        <CardHeader
          avatar={
            <UserIcon avatar={ava} fullName={FirstName + " " + LastName} size={40}/>
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
          <Link to={`/articles/${ArticleID}`} className={"articleListLink"} >
            <Typography variant="h6" color="text.primary" gutterBottom paragraph>
              Title: {Title}
            </Typography>
          </Link>
          <Typography variant="body1" color="text.primary" gutterBottom paragraph>
            {Text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <LikesContainer article={article}/>
          <Badge color="primary"
                 badgeContent={numberOfComments}
                 anchorOrigin={{
                   vertical: 'top',
                   horizontal: 'right',
                 }}
          >
          <Button
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
          >
            Comments
          </Button>
        </Badge>
          <CardOverflow sx={{ display: 'flex', width: '100%' }} >
              <Input
                variant="outlined"
                size="sm"
                placeholder="Add a comment…"
                sx={{ flexGrow: 1, ml: 4 }}
                fullWidth
                value={commentValue}
                onChange={handleCommentChange}
              />
            <Button variant="plain"
                    size="sm"
                    onClick={handleSendComment}
            >
              <SendOutlined />
            </Button>
          </CardOverflow>
        </CardActions>
        <Collapse in={expanded}
                  timeout="auto"
                  unmountOnExit>
          <CardContent>
            <Grid container spacing={2}>
              <CommentsContainer articleId={ArticleID}/>
            </Grid>
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