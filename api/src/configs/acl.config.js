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
  ARTICLE: 'article',
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
  {
    action: Action.DELETE,
    possession: Possession.OWN,
  },
];

const allowOwnUser = [
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
    [Resources.ARTICLE]: allowAny,
  },
  [Roles.USER]: {
    [Resources.USER]: allowOwnUser,
    [Resources.ARTICLE]: allowOwn,
  },
};

export { Action, Possession, Resources, Roles, allowAny, allowOwn, aclRules };
