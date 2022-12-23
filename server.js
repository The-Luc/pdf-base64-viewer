const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3333;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log(req);

  const response = {
    name: 'Jacki',
    pdf: 'null',
  };
  res.send(JSON.stringify(response));
});

app.post('/', (req, res) => {
  res.send(`<embed
      src="${req.body.pdf}"
      type="application/pdf"
      frameBorder="0"
      scrolling="auto"
      height="100%"
      width="100%"
  ></embed>`);

  // res.send(`<h2>luc thi</h2>`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

