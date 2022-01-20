import { UserForList } from "../../../components/userForList";
import UserValidation from "../../../propsValidation/UserValidation";
import { User } from "../../../components/user";
import PropTypes from "prop-types";

export const UserForListContainer = ({ user }) => {
  const { UserID, FirstName, LastName, Avatar } = user;
  const FullName = `${FirstName} ${LastName}`;

  return (
    <>
      <UserForList userId={UserID} fullName={FullName} avatar={Avatar}/>
    </>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    UserValidation
  })
};

User.defaultProps = {
  user: {
    firstName: "N/A",
    lastName: "N/A",
    email: "N/A",
    avatar: null,
    phone: "N/A",
    university: "N/A"
  }
}