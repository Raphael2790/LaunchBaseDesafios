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

server.get('/content', (req, res) =>{
  return res.render('content', {cards:data.grid,navbar:data.navbar})
})

server.get('/courses', (req, res) => {
  const id = req.query.id;

  const course = data.grid.find((course) => {
      return course.id == id;
  })

  if(!course) {
    return res.render('not-found', {navbar:data.navbar})
    }

  return res.render('courses', {navbar:data.navbar})
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