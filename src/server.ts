const express = require('express');

const app = express();
const PORT = 3000;
const port = process.env.PORT || PORT;

app.use(express.static(`${__dirname}/index.html`));

app.get('/login', (req, res) => {
  res.sendFile(`${__dirname}/pages/login/index.html`);
});

app.listen(port, () => {
  console.log(`Мой текст и порт: ${port}!`);
});
