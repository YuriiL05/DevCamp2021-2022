import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

import "./style.css"
import { UserIcon } from "../userIcon";

export const UserForList = ( { userId, fullName, avatar } ) => {
  return (
    <div className={"userList"}>
      <Link to={`/users/${userId}`} className={"userListLink"}>
        <UserIcon avatar={avatar}/>
        <div className={"fullName"}>{fullName}</div>
      </Link>
    </div>
  );
};

UserForList.propTypes = {
  userId: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
};