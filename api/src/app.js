const express = require('express');
const bodyParser = require('body-parser');

const config = require('./services/config');
const userRouters = require('./routes/users');
const articleRouters = require('./routes/articles');

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRouters);
app.use('/articles', articleRouters);

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
