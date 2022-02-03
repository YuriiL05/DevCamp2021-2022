const PropTypes = require("prop-types");
const CommentValidation = require("./CommentValidation");

module.exports = {
    Title: PropTypes.string.isRequired,
    Body: PropTypes.string.isRequired,
    AccessLevelID: PropTypes.number.isRequired,
    UserID: PropTypes.number.isRequired,
    Date: PropTypes.string.isRequired,
}