const { Console } = require('console');
const fs = require('fs');

const logToFile = new Console({
  stdout: fs.createWriteStream('logs/normalStdout.txt'),
  stderr: fs.createWriteStream('logs/errStdErr.txt'),
});

module.exports = logToFile;
