const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./services/config');
const userRouters = require('./routes/users');
const articleRouters = require('./routes/articles');
const commentRouters = require('./routes/comments');
const uploadsRouters = require('./routes/uploads');

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use('/users', userRouters);
app.use('/articles', articleRouters);
app.use('/comments', commentRouters);
app.use('/uploads', uploadsRouters);

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
