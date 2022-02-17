import { useQuery } from "react-query";
import { getFriends } from "../api/crud";
import { Loading } from "../../../components/loading";
import { FriendsList } from "../../../components/friendsList";
import * as React from "react";
import { FriendsSearch } from "../../../components/friendsSearch";
import PropTypes from "prop-types";

export const FriendsContainer = ({ userId }) => {

  const { isFetching, refetch, data } = useQuery(`friends${userId}`, () => getFriends(userId));
  const friends = data?.data;

  return (
    <>
      <FriendsSearch/>
      {isFetching && <Loading/>}
      {friends && <FriendsList friends={friends}/>}
    </>
  );
};

FriendsContainer.propTypes = {
  userId: PropTypes.number.isRequired,
};