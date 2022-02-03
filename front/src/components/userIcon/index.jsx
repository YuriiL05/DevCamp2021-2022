import PropTypes from 'prop-types';

import "./style.css"
import { Avatar } from "@mui/material";

export const UserIcon = ( { avatar, fullName, size } ) => {
  return (
    <Avatar alt={fullName} src={avatar} sx={{ width: size, height: size }}/>
  );
};

UserIcon.propTypes = {
  avatar: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  size: PropTypes.number
};

UserIcon.default = {
  size: 24
}