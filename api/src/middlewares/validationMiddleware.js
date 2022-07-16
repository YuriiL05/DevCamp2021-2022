const UnprocessableEntityException = require('../errors/UnprocessableEntityException');

const validationMiddleware = (rules) => async (req, res, next) => {
  const errorMessage = {};
  let isValid = true;

  for await (const parameterName of Object.keys(rules.body)) {
    const validationResults = [];
    // eslint-disable-next-line no-prototype-builtins
    const isParameterPresent = req.body.hasOwnProperty(parameterName);

    if (!isParameterPresent && rules.body[parameterName]['isRequired']) {
      validationResults.push('is required');
      continue;
    } else if (!isParameterPresent) {
      continue;
    }

    const parameterVlue = req.body[parameterName];

    for await (const validationRule of Object.entries(
      rules.body[parameterName]
    )) {
      switch (validationRule[0]) {
        case 'parameterType':
          if (
            validationRule[1] === 'name' &&
            !/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(parameterVlue)
          ) {
            validationResults.push('format is not acceptable for name');
          } else if (
            validationRule[1] === 'email' &&
            !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
              parameterVlue
            )
          ) {
            validationResults.push('format is not acceptable for email');
          }
      }
    }
    if (validationResults.length > 0) {
      errorMessage[parameterName] = validationResults;
      isValid = false;
    }
  }

  if (isValid) {
    return next();
  }

  next(new UnprocessableEntityException(errorMessage));
};

module.exports = validationMiddleware;
