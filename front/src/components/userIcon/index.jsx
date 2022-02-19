import PropTypes from 'prop-types';

import "./style.css"
import { Avatar } from "@mui/material";

const UserIcon = ( { avatar, fullName, size } ) => {
  return (
    <Avatar alt={fullName} src={avatar} sx={{ width: size, height: size }}/>
  );
};

UserIcon.propTypes = {
  avatar: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  size: PropTypes.number
};

UserIcon.defaultProps = {
  avatar: 'N/A',
  size: 50,
}

export default UserIcon;
