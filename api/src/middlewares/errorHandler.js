import NotFoundException from '../errors/NotFoundException.js';
import BadRequestException from '../errors/BadRequestException.js';
import UnauthorizedException from '../errors/UnauthorizedException.js';
import ForbiddenException from '../errors/ForbiddenException.js';
import UnprocessableEntityException from '../errors/UnprocessableEntityException.js';
const errorHandler = (err, req, res, next) => {
  let errMsg = err.stack;

  if (process.env.NODE_ENV === 'production') {
    errMsg = err.message;
  }

  if (res.headersSent) {
    return next(err);
  }
  console.log('==========================');
  console.log(err);
  if (err instanceof NotFoundException) {
    res.status(404).send(errMsg);
  } else if (err instanceof BadRequestException) {
    res.status(400).send(errMsg);
  } else if (err instanceof UnauthorizedException) {
    res.sendStatus(401);
  } else if (err instanceof ForbiddenException) {
    return res.status(403).send({ error: 'Forbidden' });
  } else if (err instanceof UnprocessableEntityException) {
    return res.status(422).send(err.message);
  } else {
    res.status(500).send('Something went wrong');
  }
};

export default errorHandler;
