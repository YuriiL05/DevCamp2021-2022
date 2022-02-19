const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./configs/config');
const port = config.appPort;

const usersRouter = require('./routes/usersRouter');
const articlesRouter = require('./routes/articlesRouter');
const commentsRouter = require('./routes/commentsRouter');
const universitiesRouter = require('./routes/universitiesRouter');
const accessLevelsRouter = require('./routes/accessLevelsRouter');
const friendsRouter = require('./routes/friendsRouter');
const uploadsRouters = require('./routes/uploadsRouter');

const { logger, logError } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(logger);

app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);
app.use('/universities', universitiesRouter);
app.use('/uploads', uploadsRouters);
app.use('/accessLevels', accessLevelsRouter);
app.use('/friends', friendsRouter);

app.use(logError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
