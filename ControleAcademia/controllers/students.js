const fs = require('fs');
const data = require('../schoolRegister.json');
const { split, age, graduation, date} = require('../utils');

exports.index = (req, res) => {



  return res.render('desafios/index', {students: data.students});
}

exports.post = (req, res) => {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if(req.body[key] == "")
      return res.send("Preencha todos os campos por favor");
  }

  let { avatar_url, name, birth, grade, classmodel, lessioning } = req.body;

  lessioning = lessioning.split(',').trim();
  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.students.length +1);

  data.students.push({
    id,
    avatar_url,
    name,
    birth,
    grade,
    classmodel,
    lessioning,
    created_at
  });

  fs.writeFile("schoolRegister.json",JSON.stringify(data, null, 2),(err) => {
    if(err) {
      return res.send("Ocorreu um erro ao gravar o arquivo")
    }

    return res.redirect('desafios')
  })

}

exports.show = (req, res) => {

  const { id } = req.params

  const foundTeacher = data.students.find(student => 
    student.id == id
  )

  if(!foundTeacher) {
    return res.send("Não foi encontrado o professor solicitado")
  }

  const student = {
    ...foundTeacher,
    grade:graduation(foundTeacher.grade),
    created_at:new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    birth:age(foundTeacher.birth)
  }

  res.render('desafios/show', {student})
}

exports.edit = (req, res) => {

  const { id } = req.params;

  const foundTeacher = data.students.find(student => student.id == id);

  if(!foundTeacher) {
    return res.send("Nenhum professor foi encontrado")
  }

  const student = {
    ...foundTeacher,
    birth: date(foundTeacher.birth)
  }

  return res.render('desafios/edit', {student})
}

exports.put = (req, res) => {

  const { id } = req.body;
  let index;

  const foundTeacher = data.students.find(function (instructor, foundIndex) {
    if(instructor.id == id) {
      index = foundIndex;
      return true;
   }
  } 
 )

  if(!foundTeacher) {
    return res.send("Não foi possivel editar");
  }

  const student = {
    ...foundTeacher,
    ...req.body,
    id:Number(req.body.id),
    birth: Date.parse(req.body.birth)
  }

  data.students[index] = student;

  fs.writeFile("schoolRegister.json", JSON.stringify(data, null,2), function(err) {
    if(err) return res.send("Não foi possível reescrever o arquivo");

    return res.redirect(`/desafios/${id}`);
  })
}

exports.delete = (req, res) => {

  const { id } = req.body;

  const filteredTeachers = data.students.filter(student => {
    return student.id != id;
  })

  data.students = filteredTeachers;

  fs.writeFile("schoolRegister.json", JSON.stringify(data, null, 2), function(err) {
    if(err) {
      return res.send("Erro ao escrever o arquivo");
    }

    return res.redirect('/desafios')
  })
}