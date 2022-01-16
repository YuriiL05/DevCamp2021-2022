const PropTypes = require("prop-types");

module.exports = {
  commentId: PropTypes.number.isRequired,
  authorId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
}