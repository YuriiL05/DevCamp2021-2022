const PropTypes = require("prop-types");
const CommentValidation = require("./CommentValidation");

module.exports = {
  id: PropTypes.number.isRequired,
  test: PropTypes.oneOf(["Digits", "A-Z", "File"]),
  articleInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    accessLevel: PropTypes.number.isRequired,
    authorId: PropTypes.number.isRequired,
    creationDate: PropTypes.instanceOf(Date).isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape(CommentValidation)
    )
  }).isRequired
}