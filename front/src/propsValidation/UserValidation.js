const PropTypes = require("prop-types");

module.exports = {
  FirstName: PropTypes.string.isRequired,
  LastName: PropTypes.string.isRequired,
  Email: PropTypes.string.isRequired,
  Avatar: PropTypes.string,
  Phone: PropTypes.string.isRequired,
  UniversityName: PropTypes.string
}