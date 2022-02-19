const { s3 } = require('../configs/s3Client');
const multerS3 = require('multer-s3');
const multer = require('multer');
const config = require('../configs/config');

const storage = multerS3({
  s3: s3,
  bucket: config.awsBucketName,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `avatars/${req.params.id}`);
  },
  contentType: multerS3.AUTO_CONTENT_TYPE,
});

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb('Incorrect format of file', false);
  }
};

const limits = {
  fileSize: 1024 * 300,
};

module.exports = multer({ storage, fileFilter, limits });
