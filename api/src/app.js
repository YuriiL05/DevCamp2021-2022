const express = require('express');
const bodyParser = require('body-parser');
const db = require('./services/db');

const config = require('./services/config');

const port = config.appPort;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  try {
    await db('Universities').insert(req.body);
  } catch (e) {
    console.log(e);
  }

  res.send(req.body);
});

app.delete('/:id', async (req, res) => {
  try {
    await db('Universities').where({ UniversityID: req.params.id }).delete();
  } catch (e) {
    console.log(e);
  }

  res.send();
});

app.get('/', async (req, res) => {
  let result = '1';

  try {
    result = await db.select().from('Universities');
  } catch (e) {
    console.log(e);
  }

  res.send(result);
});

app.put('/:id', async (req, res) => {
  try {
    await db('Universities')
      .where({ UniversityID: req.params.id })
      .update(req.body);
  } catch (e) {
    console.log(e);
  }

  res.send();
});

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
