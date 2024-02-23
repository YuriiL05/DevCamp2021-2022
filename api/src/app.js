import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import config from './configs/config.js';
import passport from './services/strategyService.js';
import usersRouter from './routes/usersRouter.js';
import articlesRouter from './routes/articlesRouter.js';
import commentsRouter from './routes/commentsRouter.js';
import likesRouter from './routes/likesRouter.js';
import universitiesRouter from './routes/universitiesRouter.js';
import accessLevelsRouter from './routes/accessLevelsRouter.js';
import friendsRouter from './routes/friendsRouter.js';
import uploadsRouters from './routes/uploadsRouter.js';
import authRouter from './routes/authRouter.js';
import { logger, logError } from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';
import authMiddleware from './middlewares/authMiddleware.js';

const app = express();

app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(logger);

app.use('/auth', authRouter);
app.use(authMiddleware);
app.use('/users', usersRouter);
app.use('/articles', articlesRouter);
app.use('/comments', commentsRouter);
app.use('/likes', likesRouter);
app.use('/universities', universitiesRouter);
app.use('/uploads', uploadsRouters);
app.use('/accessLevels', accessLevelsRouter);
app.use('/friends', friendsRouter);

app.use(logError);
app.use(errorHandler);

app.listen(config.appPort, () => {
  console.log(`Started at port ${config.appPort}`);
});
