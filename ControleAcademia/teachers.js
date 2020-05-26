const fs = require('fs');
const data = require('./teachers.json');
const { split, age } = require('./utils')

exports.post = (req, res) => {
  const keys = Object.keys(req.body)

  for (key of keys) {
    if(req.body[key] == "")
      return res.send("Preencha todos os campos por favor");
  }

  let { avatar_url, name, birth, grade, classmodel, lessioning } = req.body;

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
    lessioning:split(foundTeacher.lessioning),
    created_at:new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),
    birth:age(foundTeacher.birth)
  }

  res.render('desafios/show', {teacher})
}