import { Profile } from "../../components/profile";
import PropTypes from "prop-types";
import UserValidation from "../../propsValidation/UserValidation"


export const ProfileContainer = ( { user } ) => {
  const userName = user.name;
  const avatar = "/files/1.jpg";

  return (
    <>
      <Profile userName={userName} avatar={avatar}/>
    </>
  );
};

ProfileContainer.propTypes = {
  user: PropTypes.shape(Object.assign(UserValidation,
    {
      friends: PropTypes.arrayOf(PropTypes.shape(UserValidation)),
    })).isRequired
}
