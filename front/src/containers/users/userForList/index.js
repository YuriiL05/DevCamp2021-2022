import { UserForList } from "../../../components/userForList";
import UserForListValidation from "../../../propsValidation/UserForListValidation";
import { useQuery } from "react-query";
import { getAvatar } from "../api/crud";

export const UserForListContainer = ({ userId, firstName, lastName, avatar }) => {

  return (
    <>
      <UserForList userId={userId} firstName={firstName} lastName={lastName} avatar={avatar}/>
    </>
  );
};

UserForListContainer.propTypes = UserForListValidation;

UserForListContainer.defaultProps = {
  avatar: null
}