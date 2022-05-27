const usersService = require('../services/usersService');
const articlesService = require('../services/articlesService');

// Users permissions config
const userCreate = [
  {
    resource: 'user',
    action: 'create',
    possession: 'any',
  },
];

const userUpdate = [
  {
    resource: 'user',
    action: 'update',
    possession: 'own',
    getResource: (req) => usersService.getById(req.params.id),
    isOwn: (resource, userId) => resource.UserID === userId,
  },
];

const userDelete = [
  {
    resource: 'user',
    action: 'delete',
    possession: 'any',
  },
];

// Articles permissions config
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
    getResource: (req) => articlesService.getById(req.params.id),
    isOwn: (resource, userId) => resource.UserID === userId,
  },
];

module.exports = {
  userCreate,
  userUpdate,
  userDelete,
  articleUpdate,
  articleDelete,
};
