import { UserForList } from "../../../components/userForList";
import UserForListValidation from "../../../propsValidation/UserForListValidation";
import { useQuery } from "react-query";
import { getAvatar } from "../api/crud";

export const UserForListContainer = ({ userId, firstName, lastName }) => {
  const fullName = `${firstName} ${lastName}`;

  const { isFetching, refetch, data, isError } = useQuery(`avatar${userId}`, () => getAvatar(userId));
  const avatar = data?.data

  return (
    <>
      <UserForList userId={userId} fullName={fullName} avatar={avatar}/>
    </>
  );
};

UserForListContainer.propTypes = UserForListValidation;

UserForListContainer.defaultProps = {
  avatar: null
}