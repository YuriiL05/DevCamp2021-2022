import { useQuery } from 'react-query';

import { getUsers } from './api/crud';
import { Loading } from "../../components/loading";
import { UserForListContainer } from "./userForList";

export const UsersContainer = () => {

  const { isFetching, refetch, data } = useQuery('users', () => getUsers());
  const users = data?.data;

  return (
    <>
      {isFetching && <Loading/>}
      {users?.map((user) => (<UserForListContainer key={user.UserID} user={user}/>))}
    </>
  );
};
