const PropTypes = require("prop-types");
const ArticleValidation = require("../propsValidation/ArticleValidation");

module.exports = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  submitArticle: PropTypes.func.isRequired,
  article: PropTypes.shape(ArticleValidation)
}