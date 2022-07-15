const asyncHandler = require('../common/asyncHandler');
const articlesService = require('../services/articlesService');
const NotFoundException = require('../errors/NotFoundException');
const BadRequestException = require('../errors/BadRequestException');

module.exports = {
  get: asyncHandler(async (req, res) => {
    const articles = await articlesService.getAll();

    if (articles.length === 0) {
      throw new NotFoundException('Articles not found');
    } else {
      res.status(200).send(articles);
    }
  }),

  getById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const article = await articlesService.getById(id);

    if (article) {
      res.status(200).send(article);
    } else {
      throw new NotFoundException(`Article with Id: ${id} is not found`);
    }
  }),

  create: asyncHandler(async (req, res) => {
    const articleBody = req.body;
    const { UserID } = req.auth;
    const newFileLocation = req?.file?.location || null;

    const newArticleData = {
      ...articleBody,
      UserID,
      File: newFileLocation,
    };

    if (Object.keys(articleBody).length > 0 || newFileLocation) {
      const newArticleId = await articlesService.create(newArticleData);
      res.status(201).send({ id: newArticleId });
    } else {
      throw new BadRequestException('Article information is empty');
    }
  }),

  updateById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const articleBody = req.body;
    const newFileLocation = req?.file?.location || req.body.File;

    const articleUpdates = {
      Title: articleBody.Title,
      Body: articleBody.Body,
      AccessLevelID: articleBody.AccessLevelID,
      File: newFileLocation,
    };

    if (Object.keys(articleUpdates).length > 0) {
      const updatedArticle = await articlesService.updateById(
        articleUpdates,
        id
      );
      if (updatedArticle) {
        res.status(201).send(updatedArticle);
      } else {
        throw new NotFoundException(`Article with Id: ${id} is not found`);
      }
    } else {
      throw new BadRequestException('Article information is empty');
    }
  }),

  updateFile: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const newFilePath = req?.file?.location || null;
    const articleUpdates = { File: newFilePath };

    const updatedArticle = await articlesService.updateById(articleUpdates, id);
    if (updatedArticle) {
      res.status(201).send(updatedArticle);
    } else {
      throw new NotFoundException(`Article with Id: ${id} is not found`);
    }
  }),

  deleteById: asyncHandler(async (req, res) => {
    const id = req.params.id;
    const isDeleted = await articlesService.deleteById(id);

    res
      .status(200)
      .send(
        isDeleted
          ? `Article with Id: ${id} is deleted`
          : `Article with Id: ${id} is absent`
      );
  }),
};
