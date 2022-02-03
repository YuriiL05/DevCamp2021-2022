const PropTypes = require("prop-types");
const UserValidation = require("./UserValidation");

module.exports = {
  user: PropTypes.shape(UserValidation).isRequired,
  universities: PropTypes.array
}