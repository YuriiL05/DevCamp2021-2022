import PropTypes from 'prop-types';

import "./style.css"
import { Button, Collapse, Grid, IconButton, Paper, styled, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import UserIcon from "../userIcon";
import { Input } from "@mui/joy";
import { SendOutlined } from "@mui/icons-material";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as React from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'left',
  color: theme.palette.text.primary,
}));

export const Comments = ({ comment, user, replyToUser, handleReplyComment }) => {
  const { Text, CreateDate, UpdateDate, CommentID, ArticleID } = comment;
  const { FirstName, LastName, Avatar } = user;
  const fullName = `${FirstName} ${LastName}`;

  const [commentValue, setCommentValue] = useState('');
  const [isReply, setIsReply] = useState(false);

  const handleReplyInput = () => {
    setIsReply(!isReply);
  };

  const handleSendComment = () => {
    handleReplyComment({
      Text: commentValue,
      ReplyToCommentID: CommentID,
      ArticleID
    })
  };

  const handleCommentChange = (event) => {
    setCommentValue(event.target.value);
  };

  return (
    <>
      <Grid item xs={8}>
        <Item>
          <Grid item xs={8} sx={{display: 'flex', mb: 2}}>
            <Grid item xs={1}>
              <UserIcon fullName={fullName} avatar={Avatar} size={25}/>
            </Grid>
            <Grid item xs={7} sx={{ml: 2, mt: 0.5}}>
              <Typography variant="body2">{fullName}</Typography>
            </Grid>
            {replyToUser &&
              <Grid item xs="auto" sx={{ml: 2, mt: 0.5, display: 'flex'}}>
                <Typography variant="body2" sx={{mr: 2}}>reply to</Typography>
                <Link to={`/users/${replyToUser.UserID}`} >
                  <Typography variant="body2">{replyToUser.FirstName} {replyToUser.LastName}</Typography>
                </Link>
            </Grid>}
          </Grid>
          <Typography variant="body2" gutterBottom>{Text}</Typography>
          <Typography variant="caption"
                      display="block"
                      gutterBottom
                      color={grey[500]}
          >
            {CreateDate}
          </Typography>
          <Collapse in={isReply}
                    timeout="auto"
                    unmountOnExit>
            <Grid item xs sx={{display: 'flex' }}>
              <Grid item xs>
                <Input
                  variant="outlined"
                  size="sm"
                  placeholder="Reply…"
                  sx={{ flexGrow: 1, ml: 2 }}
                  fullWidth
                  value={commentValue}
                  onChange={handleCommentChange}
                />
              </Grid>
              <Grid item xs>
                <IconButton variant="plain"
                            size="sm"
                            sx={{ flexGrow: 1, ml: 2 }}
                            onClick={handleSendComment}>
                  <SendOutlined />
                </IconButton>
              </Grid>
            </Grid>
          </Collapse>
          <Collapse in={!isReply}>
            <Button type="outlined" onClick={handleReplyInput}>Reply</Button>
          </Collapse>
        </Item>
      </Grid>
    </>
  );
};

Comments.propTypes = {
  // to do
};