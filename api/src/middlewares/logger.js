import db from '../configs/db.js';
import config from '../configs/config.js';
import logToFile from '../configs/logToFile.js';

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

export { logger, logError };
