const express = require('express');
const instructors = require('./controllers/instructors');
const members = require('./controllers/members')
const teachers = require('./controllers/teachers');

const routes = express.Router();

routes.get('/', (req, res) => {
   return res.redirect('instructors');
});

routes.get('/members', members.index);

routes.get('/members/create', members.create);

routes.get('/members/:id', members.show);

routes.get('/members/:id/edit', members.edit);

routes.post('/members', members.post );

routes.put('/members', members.put);

routes.delete('/members', members.delete);



routes.get('/instructors', instructors.index);

routes.get('/instructors/create', instructors.create);

routes.get('/instructors/:id', instructors.show);

routes.get('/instructors/:id/edit', instructors.edit);

routes.post('/instructors', instructors.post );

routes.put('/instructors', instructors.put);

routes.delete('/instructors', instructors.delete);


//Rotas dos Desafios

routes.get('/desafios', teachers.index);

routes.get('/desafios/create', (req,res) => {
  return res.render('desafios/create');
})

routes.post('/desafios', teachers.post );

routes.get('/desafios/:id', teachers.show);

routes.get('/desafios/:id/edit', teachers.edit);

routes.put('/desafios', teachers.put);

routes.delete('/desafios', teachers.delete);

module.exports = routes;