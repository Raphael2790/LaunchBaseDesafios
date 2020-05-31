const fs = require('fs');
const data = require('./teachers.json');
const { split, age, graduation, date} = require('./utils');

exports.index = (req, res) => {



  return res.render('desafios/index', {teachers: data.teachers});
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
  const id = Number(data.teachers.length +1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    grade,
    classmodel,
    lessioning,
    created_at
  });

  fs.writeFile("teachers.json",JSON.stringify(data, null, 2),(err) => {
    if(err) {
      return res.send("Ocorreu um erro ao gravar o arquivo")
    }

    return res.redirect('desafios')
  })

}

exports.show = (req, res) => {

  const { id } = req.params

  const foundTeacher = data.teachers.find(teacher => 
    teacher.id == id
  )

  if(!foundTeacher) {
    return res.send("Não foi encontrado o professor solicitado")
  }

  const teacher = {
    ...foundTeacher,
    grade:graduation(foundTeacher.grade),
    created_at:new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    birth:age(foundTeacher.birth)
  }

  res.render('desafios/show', {teacher})
}

exports.edit = (req, res) => {

  const { id } = req.params;

  const foundTeacher = data.teachers.find(teacher => teacher.id == id);

  if(!foundTeacher) {
    return res.send("Nenhum professor foi encontrado")
  }

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth)
  }

  return res.render('desafios/edit', {teacher})
}

exports.put = (req, res) => {

  const { id } = req.body;
  let index;

  const foundTeacher = data.teachers.find(function (instructor, foundIndex) {
    if(instructor.id == id) {
      index = foundIndex;
      return true;
   }
  } 
 )

  if(!foundTeacher) {
    return res.send("Não foi possivel editar");
  }

  const teacher = {
    ...foundTeacher,
    ...req.body,
    id:Number(req.body.id),
    birth: Date.parse(req.body.birth)
  }

  data.teachers[index] = teacher;

  fs.writeFile("teachers.json", JSON.stringify(data, null,2), function(err) {
    if(err) return res.send("Não foi possível reescrever o arquivo");

    return res.redirect(`/desafios/${id}`);
  })
}

exports.delete = (req, res) => {

  const { id } = req.body;

  const filteredTeachers = data.teachers.filter(teacher => {
    return teacher.id != id;
  })

  data.teachers = filteredTeachers;

  fs.writeFile("teachers.json", JSON.stringify(data, null, 2), function(err) {
    if(err) {
      return res.send("Erro ao escrever o arquivo");
    }

    return res.redirect('/desafios')
  })
}