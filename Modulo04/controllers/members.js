const fs = require('fs')
const data = require('../data.json');
const { date } = require('../utils');

exports.index = (req, res) => {

  return res.render('members/index', {members: data.members});
}

exports.show = (req, res) => {

  const { id } = req.params

  
  const foundMember = data.members.find(function(member) {
    return member.id == id
  })
  
  if(!foundMember) {
    return res.send('Instrutor não encontrado');
  }

  const member = {
    ...foundMember,
    birth:date(foundMember.birth).birthDay,
  }
  
  return res.render('members/show', {member})
}

exports.create = (req, res) => {
  return res.render('members/create')
}

exports.post = (req, res) => {

  const keys = Object.keys(req.body)

  for(key of keys) {
    if(req.body[key] == "")
    return res.send("Por favor preencha todos os campos")
  }

  birth = Date.parse(birth);
  const id = Number(data.members.length + 1);

  data.members.push({
    id,
    ...req.body,
    birth,
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (error) => {
    if(error) {
      return res.send("Aconteceu um erro ao gravar arquivo")
    }
    return res.redirect('/members')
  }
  )
}

exports.edit = (req, res) => {

  const { id } = req.params

  
  const foundMember = data.members.find(function(member) {
    return member.id == id
  })
  
  if(!foundMember) {
    return res.send('Instrutor não encontrado');
  }

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso
  }

  return res.render('members/edit', { member })
}

exports.put = (req, res) => {

  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find(function(member, foundIndex) {
    if(member.id == id) {
      index = foundIndex
      return true;
    }
  })
  
  if(!foundMember) {
    return res.send('Instrutor não encontrado');
  }

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id)
  }

  data.members[index] = member

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Erro ao escrever arquivo")
    
    return res.redirect(`/members/${id}`);
  })
}

exports.delete = (req, res) => {

  const { id } = req.body;

  const filteredMembers = data.members.filter(member => {
    return member.id != id
  })

  data.members = filteredMembers

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) {
      return res.send("Não foi possével escrever o arquivo");
    }

      return res.redirect('/members');
  })
}