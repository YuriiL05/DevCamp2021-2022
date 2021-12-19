const express = require('express');
const app = express();

const config = require('./services/config');

const port = config.appPort;

app.get('/', function (req, res) {
  res.send('Hello World!!!');
});

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
