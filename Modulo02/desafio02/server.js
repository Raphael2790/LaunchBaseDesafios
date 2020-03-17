const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const port = 5050
const data = require('./data');

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  autoescape: false
})

server.get('/', (req, res) => {
  return res.render('index');
})

server.listen(5050, (err) => {
  if(err) {
    return `Erro ${err}`
  }
  console.log(`Servidor rodando na porta ${port}`)
})