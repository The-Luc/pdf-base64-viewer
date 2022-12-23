const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = express();

let pdfUrl = '';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(`<embed
      src="${pdfUrl}"
      type="application/pdf"
      frameBorder="0"
      scrolling="auto"
      height="100%"
      width="100%"
  ></embed>`);

  console.log('Get pdf successfully');
});

router.post('/', (req, res) => {
  if (!req.body.base64) {
    res.send('No url');
    return;
  }

  pdfUrl = req.body.base64;

  console.log('Save pdf successfully');
  res.send('');
});

app.use(bodyParser.json());
app.use('/.netlify/functions/api', router);

module.exports.handler = serverless(app);
