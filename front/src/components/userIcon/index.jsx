import PropTypes from 'prop-types';

import "./style.css"

export const UserIcon = ( { avatar } ) => {
  return (
    <div className={"userIcon"}>
      <img src={avatar} alt={"(-_-)"}/>
    </div>
  );
};

UserIcon.propTypes = {
  avatar: PropTypes.string.isRequired
};