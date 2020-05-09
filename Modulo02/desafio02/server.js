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
  return res.render('index', {css:"style.css"});
})

server.get('/sobre', (req, res) => {
  return res.render('sobre', {css:"sobrestyle.css"})
})

server.get('/receitas', (req, res) => {
  return res.render('receitas',{css:"receitas.css"})
})

server.get('/receitas/:index', (req, res) => {
  const recipes = data;
  const recipeIndex = req.params.index

  console.log(recipes[recipeIndex])

  return res.render('receita', {recipes, recipeIndex})
})

server.use((req, res) => {
  return res.status(404).render('not-found', {css:"style.css"});
})

server.listen(5050, (err) => {
  if(err) {
    return `Erro ${err}`
  }
  console.log(`Servidor rodando na porta ${port}`)
})