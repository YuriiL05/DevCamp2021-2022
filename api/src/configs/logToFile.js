import { Console } from 'console';
import fs from 'fs';

const logToFile = new Console({
  stdout: fs.createWriteStream('logs/normalStdout.txt'),
  stderr: fs.createWriteStream('logs/errStdErr.txt'),
});

export default logToFile;
