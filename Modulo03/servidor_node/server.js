const express = require('express');
const nunjucks = require('nunjucks');


const server = express();

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views',{
  express: server
})

server.get('/', (req, res) =>{
  return res.render('index')
})

server.get('/conteudo', (req, res) =>{
  console.log(res.status)
  return res.render('conteudo')
})

server.use(function(req, res) {
  return res.status(404).render("not-found");
});

server.listen(5000, (err) => {
  if(err) {
    return `Erro ${err}`
  }
  return 'Servidor rodando na porta 5000'
})