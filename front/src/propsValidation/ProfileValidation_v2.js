const PropTypes = require("prop-types");
const UserValidation = require("./UserValidation");

module.exports = {
  user: PropTypes.shape(Object.assign(UserValidation,
    {
      friends: PropTypes.arrayOf(PropTypes.shape(UserValidation)),
    })).isRequired
}