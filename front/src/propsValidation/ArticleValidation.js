const PropTypes = require("prop-types");

module.exports = {
    Title: PropTypes.string.isRequired,
    Text: PropTypes.string.isRequired,
    UserID: PropTypes.number.isRequired,
    CreateDate: PropTypes.string.isRequired,
}