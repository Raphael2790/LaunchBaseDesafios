const fs = require('fs');
const data = require('../schoolRegister.json');
const { split, age, graduation, date} = require('../utils');

exports.index = (req, res) => {

  return res.render('students/index', {students: data.students});
}

exports.create = (req, res) => {
  return res.render('students/create')
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if(req.body[key] == "")
      return res.send("Preencha todos os campos por favor");
  }

  birth = Date.parse(req.body.birth);
  const created_at = Date.now();

  let id = 1;

  const lastMember = data.students[data.students.length - 1]

  if(lastMember) {
    id = lastMember.id +1
  }

  id = Number(id);

  data.students.push({
    id,
    ...req.body,
    birth,
    created_at
  });

  fs.writeFile("schoolRegister.json",JSON.stringify(data, null, 2),(err) => {
    if(err) {
      return res.send("Ocorreu um erro ao gravar o arquivo")
    }

    return res.redirect('students')
  })

}

exports.show = (req, res) => {

  const { id } = req.params

  const foundStudent = data.students.find(student => 
    student.id == id
  )

  if(!foundStudent) {
    return res.send("Não foi encontrado o professor solicitado")
  }

  const student = {
    ...foundStudent,
    grade:foundStudent.grade,
    created_at:date(foundStudent.created_at).created_at,
    birth:date(foundStudent.birth).birthDay
  }

  res.render('students/show', {student})
}

exports.edit = (req, res) => {

  const { id } = req.params;

  const foundStudent = data.students.find(student => student.id == id);

  if(!foundStudent) {
    return res.send("Nenhum professor foi encontrado")
  }

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth)
  }

  return res.render('students/edit', {student})
}

exports.put = (req, res) => {

  const { id } = req.body;
  let index;

  const foundStudent = data.students.find(function (student, foundIndex) {
    if(student.id == id) {
      index = foundIndex;
      return true;
   }
  } 
 )

  if(!foundStudent) {
    return res.send("Não foi possivel editar");
  }

  const student = {
    ...foundStudent,
    ...req.body,
    id:Number(req.body.id),
    birth: Date.parse(req.body.birth)
  }

  data.students[index] = student;

  fs.writeFile("schoolRegister.json", JSON.stringify(data, null,2), function(err) {
    if(err) return res.send("Não foi possível reescrever o arquivo");

    return res.redirect(`/students/${id}`);
  })
}

exports.delete = (req, res) => {

  const { id } = req.body;

  const filteredStudents = data.students.filter(student => {
    return student.id != id;
  })

  data.students = filteredStudents;

  fs.writeFile("schoolRegister.json", JSON.stringify(data, null, 2), function(err) {
    if(err) {
      return res.send("Erro ao escrever o arquivo");
    }

    return res.redirect('/students');
  })
}