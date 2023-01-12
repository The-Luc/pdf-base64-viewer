const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const fs = require('fs');
const opendir = require('fs/promises');
const { htmlString } = require('./generate-html');

const app = express();

let pdfUrl = '';
let timer = null;
const RESET_DURATION = 5 * 60 * 1000;

const router = express.Router();

router.get('/', (req, res) => {
  res.contentType('html');
  res.send(htmlString(pdfUrl));

  console.log('Get pdf successfully');
});

router.post('/', (req, res) => {
  if (!req.body.base64) {
    res.send('No url');
    return;
  }

  pdfUrl = req.body.base64;

  console.log('Save pdf successfully');
  console.log('pdf url length: ', pdfUrl.length);

  // auto clear pdfUrl after RESET_DURATION seconds
  clearTimeout(timer);
  timer = setTimeout(() => {
    pdfUrl = '';
    console.log('Clear pdf link successfully');
  }, RESET_DURATION);

  res.send('');
});

app.use(bodyParser.json({ limit: '999mb' }));
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
