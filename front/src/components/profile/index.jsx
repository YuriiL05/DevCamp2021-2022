import PropTypes from 'prop-types';

export const Profile = ({ userName, avatar }) => {
  return (
    <div className={"profile"}>
      <p>Name: {userName}</p>
      <img src={avatar} alt={"Not uploaded"}/>
    </div>
  );
};

const isFilePath = (props, propName, componentName) => {
  const reg = /\/files\/\d+.jpg/;

  if(!reg.test(props[propName])) {
    return new Error(
      `Invalid prop ${propName} passed to ${componentName}. Expected a valid file path.`
    );
  }
};

Profile.propTypes = {
  userName: PropTypes.string.isRequired,
  avatar: isFilePath
};
