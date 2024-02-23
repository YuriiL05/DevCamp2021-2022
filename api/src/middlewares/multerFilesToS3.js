import s3 from '../configs/s3Client.js';
import multerS3 from 'multer-s3';
import multer from 'multer';
import config from '../configs/config.js';

const storage = multerS3({
  s3: s3,
  bucket: config.awsBucketName,
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(null, `articles/${file.originalname}`);
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

export default multer({ storage, fileFilter });
