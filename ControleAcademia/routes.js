const express = require('express');
const instructors = require('./instructors')
const teachers = require('./teachers')

const routes = express.Router();

routes.get('/', (req, res) => {
   return res.redirect('instructors');
});

routes.get('/instructors', (req, res) => {
  return res.render('instructors/index');
});


routes.get('/members', (req, res) => {
  return res.render('members');
});

routes.get('/instructors/create', (req,res) => {
  return res.render('instructors/create');
});

routes.get('/instructors/:id', instructors.show);

routes.get('/instructors/:id/edit', instructors.edit);

routes.post('/instructors', instructors.post );

routes.put('/instructors', instructors.put);

routes.delete('/instructors', instructors.delete);

routes.get('/desafios', (req, res) => {
  return res.render('desafios/index');
})

routes.get('/desafios/create', (req,res) => {
  return res.render('desafios/create');
})

routes.post('/desafios', teachers.post );

routes.get('/desafios/:id', teachers.show);

routes.get('/desafios/:id/edit', teachers.edit);

routes.put('/desafios', teachers.put);

module.exports = routes;