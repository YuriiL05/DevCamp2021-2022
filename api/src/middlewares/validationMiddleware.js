const UnprocessableEntityException = require('../errors/UnprocessableEntityException');
const db = require('../configs/db');
const { parameterTypes } = require('../configs/validation.config');

const validationMiddleware = (rules) => async (req, res, next) => {
  const errorMessage = {};

  for await (const parameterName of Object.keys(rules.body)) {
    const validationResults = [];
    const reqBody = { ...req.body };
    // eslint-disable-next-line no-prototype-builtins
    const isParameterPresent = reqBody.hasOwnProperty(parameterName);

    if (!isParameterPresent && rules.body[parameterName]['isRequired']) {
      errorMessage[parameterName] = ['is required'];
      continue;
    } else if (!isParameterPresent) {
      continue;
    }

    const parameterValue = reqBody[parameterName];

    for await (const validationRule of Object.entries(
      rules.body[parameterName]
    )) {
      const validationKey = validationRule[0];
      const validationValue = validationRule[1];

      switch (validationKey) {
        case 'parameterType':
          if (!parameterTypes[validationValue].pattern.test(parameterValue)) {
            validationResults.push(parameterTypes[validationValue].message);
          }
          break;
        case 'maxLength':
          if (parameterValue.length > validationValue) {
            validationResults.push(`is to long (> ${validationValue})`);
          }
          break;
        case 'minLength':
          if (parameterValue.length < validationValue) {
            validationResults.push(`is to short (< ${validationValue})`);
          }
          break;
        case 'max':
          if (parameterValue > validationValue) {
            validationResults.push(
              `should not be more then ${validationValue}`
            );
          }
          break;
        case 'min':
          if (parameterValue < validationValue) {
            validationResults.push(`should not be les then ${validationValue}`);
          }
          break;
        case 'regex':
          if (!validationValue.test(parameterValue)) {
            validationResults.push(`is not match to: ${validationValue}`);
          }
          break;
        case 'isUnique':
          // eslint-disable-next-line no-case-declarations
          const dataInDb = await db(validationValue['tableName'])
            .select()
            .first()
            .where(parameterName, parameterValue);
          if (
            dataInDb &&
            dataInDb[validationValue['tableId']] !== +req.params?.id
          ) {
            validationResults.push(`is not unique`);
          }
          break;
      }
    }
    if (validationResults.length > 0) {
      errorMessage[parameterName] = validationResults;
    }
  }

  if (!Object.keys(errorMessage).length) {
    return next();
  }

  next(new UnprocessableEntityException(errorMessage));
};

module.exports = validationMiddleware;
