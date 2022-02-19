import UserForList from "../userForList";
import * as React from "react";
import PropTypes from "prop-types";

export const FriendsList = ({ friends }) => {
  return (
    <>
      {friends.map((friend) => (<UserForList key={friend.UserID}
                                userId={friend.UserID}
                                firstName={friend.FirstName}
                                lastName={friend.LastName}
                                avatar={friend.Avatar}/>))}
    </>
  )
};

FriendsList.propTypes = {
  friends: PropTypes.array.isRequired
};
