const PropTypes = require("prop-types");

const isFilePath = (props, propName, componentName) => {
  const reg = /\/files\/\d+.jpg/;

  if(!reg.test(props[propName])) {
    return new Error(
      `Invalid prop ${propName} passed to ${componentName}. Expected a valid file path.`
    );
  }
};

module.exports = {
  userName: PropTypes.string.isRequired,
  avatar: isFilePath
}