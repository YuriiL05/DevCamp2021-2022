const usersService = require('../services/usersService');
const articlesService = require('../services/articlesService');

const Action = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
};

const Possession = {
  ANY: 'any',
  OWN: 'own',
};

const Resources = {
  POST: 'article',
  USER: 'user',
};

const Roles = {
  ADMIN: 'admin',
  USER: 'user',
};

const allowAny = [
  {
    action: Action.CREATE,
    possession: Possession.ANY,
  },
  {
    action: Action.READ,
    possession: Possession.ANY,
  },
  {
    action: Action.UPDATE,
    possession: Possession.ANY,
  },
  {
    action: Action.DELETE,
    possession: Possession.ANY,
  },
];

const allowOwn = [
  {
    action: Action.CREATE,
    possession: Possession.ANY,
  },
  {
    action: Action.READ,
    possession: Possession.ANY,
  },
  {
    action: Action.UPDATE,
    possession: Possession.OWN,
  },
];

const aclRules = {
  [Roles.ADMIN]: {
    [Resources.USER]: allowAny,
    [Resources.POST]: allowAny,
  },
  [Roles.USER]: {
    [Resources.USER]: allowOwn,
    [Resources.POST]: allowOwn,
  },
};

const userUpdate = [
  {
    resource: 'user',
    action: 'update',
    possession: 'own',
    getResource: (req) => usersService.getById(req.params.id),
    isOwn: (resource, userId) => resource.id === userId,
  },
];

const articleUpdate = [
  {
    resource: 'article',
    action: 'update',
    possession: 'own',
    getResource: (req) => articlesService.getById(req.params.id),
    isOwn: (resource, userId) => resource.UserID === userId,
  },
];

const articleDelete = [
  {
    resource: 'article',
    action: 'delete',
    possession: 'own',
    getResource: (req) => articlesService.getById(req.params.ArticleID),
    isOwn: (resource, userId) => resource.UserID === userId,
  },
];

module.exports = {
  Action,
  Possession,
  Resources,
  Roles,
  allowAny,
  allowOwn,
  aclRules,
  userUpdate,
  articleUpdate,
  articleDelete,
};
