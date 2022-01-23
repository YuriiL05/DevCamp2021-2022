const PropTypes = require("prop-types");
const FileValidation = require("./FileValidation");
const AddressValidation = require("./AddressValidation");

module.exports = {
  name: PropTypes.string.isRequired,
  age: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  avatar: PropTypes.shape({
    file: PropTypes.shape(FileValidation).isRequired
  }),
  files: PropTypes.arrayOf(PropTypes.shape(FileValidation)).isRequired,
  addrr: PropTypes.shape({
    main: PropTypes.shape(AddressValidation).isRequired,
    alt: PropTypes.shape(AddressValidation)
  })
}