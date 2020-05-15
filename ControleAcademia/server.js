const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const server = express();

server.use(express.static('public'));
server.use(routes);
server.set('view engine', 'njk');

nunjucks.configure('views',{
  express: server,
  autoescape:false, //faz o nunjucks interpretar html
  noCache:true
})


server.listen(5000, (err) => {
  if(err) {
    return `Erro ${err}`
  }
  return 'Servidor rodando na porta 5000'
})