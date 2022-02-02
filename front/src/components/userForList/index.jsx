import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css"
import { UserIcon } from "../userIcon";

export const UserForList = ( { userId, firstName, lastName, avatar } ) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div className={"userList"}>
      <Link to={`/users/${userId}`} className={"userListLink"}>
        <UserIcon avatar={avatar} fullName={fullName}/>
        <div className={"fullName"}>{fullName}</div>
      </Link>
    </div>
  );
};

UserForList.propTypes = {
  userId: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  avatar: PropTypes.string
};

UserForList.defaultProps = {
  avatar: null
}