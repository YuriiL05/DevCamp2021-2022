const express = require('express');
const bodyParser = require('body-parser');

const config = require('./services/config');
const userRouters = require('./routes/users');

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/users', userRouters);

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
