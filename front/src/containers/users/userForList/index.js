import { UserForList } from "../../../components/userForList";
import UserForListValidation from "../../../propsValidation/UserForListValidation";

export const UserForListContainer = ({ userId, firstName, lastName, avatar }) => {
  const fullName = `${firstName} ${lastName}`;

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