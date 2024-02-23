import multer from 'multer';
import fsExtra from 'fs-extra';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = `uploads/${req.params.id}`;

    fsExtra.ensureDirSync(uploadPath, undefined);
    fsExtra.emptyDirSync(uploadPath);

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileFormat = file.mimetype.split('/').pop();

    cb(null, `avatar.${fileFormat}`);
  },
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
