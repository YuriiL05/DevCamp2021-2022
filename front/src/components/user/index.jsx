import UserValidation from "../../propsValidation/UserValidation";
import { UserIcon } from "../userIcon";
import PropTypes from "prop-types";

export const User = ({ user }) => {
  const { FirstName, LastName, Email, Phone, Avatar, Name } = user;
  const fullName = `${FirstName} ${LastName}`;

  return (
    <div>
      <UserIcon avatar={Avatar} fullName={fullName} size={100}/>
      <p>Name: {fullName}</p>
      <p>Email: {Email}</p>
      <p>Phone: {Phone}</p>
      <p>University: {Name}</p>
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape(UserValidation)
};

User.defaultProps = {
  university: 'N/A'
}