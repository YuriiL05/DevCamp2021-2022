const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./services/config');
const userRouters = require('./routes/users');
const articleRouters = require('./routes/articles');
const commentRouters = require('./routes/comments');
const universitiesRouter = require('./routes/universities');
const accessLevelsRouter = require('./routes/accessLevels');
const friendsRouter = require('./routes/friends');
const uploadsRouters = require('./routes/uploads');
const { logger, logError } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(logger);

app.use('/users', userRouters);
app.use('/articles', articleRouters);
app.use('/comments', commentRouters);
app.use('/universities', universitiesRouter);
app.use('/uploads', uploadsRouters);
app.use('/accessLevels', accessLevelsRouter);
app.use('/friends', friendsRouter);

app.use(logError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
