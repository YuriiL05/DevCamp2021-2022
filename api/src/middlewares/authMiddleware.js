const jwt = require('jsonwebtoken');
const { appSecretKey } = require('../configs/config');
const UnauthorizedException = require('../errors/UnauthorizedException');

const authMiddleware = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    let decoded;
    try {
      decoded = await new Promise((resolve, reject) => {
        jwt.verify(token, appSecretKey, null, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    } catch (e) {
      // do nothing
    }
    if (decoded) {
      req.auth = decoded;
      return next();
    }
  }

  next(new UnauthorizedException());
};

module.exports = authMiddleware;
