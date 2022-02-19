import { useQuery } from "react-query";
import { getUsers } from "../../users/api/crud";
import { SearchUsers } from "../../../components/searchUsers";
import { useState } from "react";
import UserForList from "../../../components/userForList";
import * as React from "react";

export const SearchContainer = () => {
  const [user, setUser] = useState(null);

  const { isFetching, refetch, data } = useQuery('users', () => getUsers());
  const users = data?.data;


  return (
    <>
      {users && <SearchUsers users={users} setUser={setUser}/>}
      {user && <UserForList userId={user.UserID}
                            firstName={user.FirstName}
                            lastName={user.LastName}
                            avatar={user.Avatar}/>}
    </>
  );
};