import ForbiddenException from '../errors/ForbiddenException.js';
import usersService from '../services/usersService.js';
import { aclRules, Possession, Roles } from '../configs/acl.config.js';

const aclMiddleware = (rule) => async (req, res, next) => {
  const rules = Array.isArray(rule) ? rule : [rule];
  let isAllow = false;

  const user = await usersService.getRoleById(req.auth.UserID);
  const userRole = user?.role || Roles.USER;

  for await (const checkRule of rules) {
    if (aclRules[userRole] && aclRules[userRole][checkRule.resource]) {
      for await (const permission of aclRules[userRole][checkRule.resource]) {
        const canUseAnyAction =
          permission.possession === Possession.ANY &&
          permission.action === checkRule.action;

        if (checkRule.possession === Possession.ANY) {
          if (canUseAnyAction) {
            isAllow = true;
            break;
          }
        } else {
          if (canUseAnyAction) {
            isAllow = true;
            break;
          } else {
            const resource = await checkRule.getResource(req);
            if (resource && checkRule.isOwn(resource, req.auth.UserID)) {
              isAllow = true;
              break;
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

export default aclMiddleware;
