const express = require('express');
const nunjucks = require('nunjucks');


const server = express();

const data = require('./data')

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views',{
  express: server,
  autoescape:false //faz o nunjucks interpretar html
})

server.get('/', (req, res) =>{
  return res.render('index', {navbar:data.navbar})
})

server.get('/conteudo', (req, res) =>{
  return res.render('conteudo', {cards:data.grid,navbar:data.navbar})
})

server.use(function(req, res) {
  return res.status(404).render("not-found",{navbar:data.navbar} );
});

server.listen(5000, (err) => {
  if(err) {
    return `Erro ${err}`
  }
  return 'Servidor rodando na porta 5000'
})