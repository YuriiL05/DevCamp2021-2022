const multer = require('multer');
const mkdirp = require('mkdirp');

const storage = multer.diskStorage({
  destination: (req, file, next) => {
    const uploadPath = `uploads/${req.params.id}`;
    mkdirp.sync(uploadPath);

    next(null, uploadPath);
  },
  filename: (req, file, next) => {
    const fileFormat = file.mimetype.split('/').pop();

    next(null, `avatar.${fileFormat}`);
  },
});

const types = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (req, file, next) => {
  if (types.includes(file.mimetype)) {
    next(null, true);
  } else {
    next(null, false);
  }
};

module.exports = multer({ storage, fileFilter });
