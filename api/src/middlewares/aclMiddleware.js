const ForbiddenException = require('../errors/ForbiddenException');
const usersService = require('../services/usersService');
const { aclRules, Possession } = require('../configs/acl.config');

const aclMiddleware = (rule) => async (req, res, next) => {
  const rules = Array.isArray(rule) ? rule : [rule];
  let isAllow = false;

  const user = await usersService.getRoleById(req.auth.UserID);
  if (user) {
    for await (const checkRule of rules) {
      if (aclRules[user.role] && aclRules[user.role][checkRule.resource]) {
        for await (const permission of aclRules[user.role][
          checkRule.resource
        ]) {
          const canUseAnyAction =
            permission.possession === Possession.ANY &&
            permission.action === checkRule.action;

          if (checkRule.possession === Possession.ANY) {
            if (canUseAnyAction) {
              isAllow = true;
            }
          } else {
            if (canUseAnyAction) {
              isAllow = true;
            } else {
              const resource = await checkRule.getResource(req);
              if (checkRule.isOwn(resource, user.UserID)) {
                isAllow = true;
              }
            }
          }
        }
      }
    }
  }

  if (isAllow) {
    return next();
  }

  next(new ForbiddenException());
};

module.exports = aclMiddleware;
