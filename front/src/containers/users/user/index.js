import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";

import { getUser } from '../api/crud';
import { Loading } from "../../../components/loading";
import { User } from "../../../components/user";
import { NotFound } from "../../../components/404";


export const UserContainer = () => {
  const { id } = useParams();

  const { isFetching, refetch, data, isError } = useQuery(`user${id}`, () => getUser(id));
  const user = data?.data;

  return (
    <>
      {isFetching && <Loading/>}
      {isError && <NotFound/>}
      {user && <User user={user}/>}
    </>
  );
};
