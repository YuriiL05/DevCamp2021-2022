const db = require('../configs/db');
const config = require('../configs/config');
const logToFile = require('../configs/logToFile');

const logger = async (req, res, next) => {
  const loggedData = {
    Method: req.method,
    Path: req.path,
    Date: new Date(),
    Body: config.logsBody ? req.body : null,
  };

  if (config.logsToDB) {
    await db(config.logsTable).insert(loggedData).catch(next);
  }
  logToFile.log('===========================');
  logToFile.log(loggedData);

  next();
};

const logError = (err, req, res, next) => {
  logToFile.error('===========================');
  logToFile.error(new Date().toISOString());
  logToFile.error(err);

  next(err);
};

module.exports = {
  logger,
  logError,
};
