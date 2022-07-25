import { useQuery } from "react-query";
import { getFriends } from "../api/crud";
import { Loading } from "../../../components/loading";
import { FriendsList } from "../../../components/friendsList";
import * as React from "react";
import { FriendsSearch } from "../../../components/friendsSearch";
import { useContext } from "react";
import userContext from "../../../contexts/userContext";

export const FriendsContainer = () => {
  const { id: UserID } = useContext(userContext).user;

  const { isFetching, data } = useQuery(
    `friends${UserID}`,
    () => getFriends(UserID),
    {
      retry: false
    }
  );
  const friends = data?.data;

  return (
    <>
      <FriendsSearch/>
      {isFetching && <Loading/>}
      {friends && <FriendsList friends={friends}/>}
      {!isFetching && !friends && <p>You have no friends yet :(</p>}
    </>
  );
};
