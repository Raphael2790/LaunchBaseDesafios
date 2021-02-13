const { age, date } = require("../../lib/utils");
const Teacher = require("../database/Teacher");

module.exports = {
  index(req, res) {
    Teacher.all((teachers) => {
      teachers.map(teacher => {
        teacher.lessioning = teacher.lessioning.split(",");
      });
      return res.render("teachers/index", { teachers });
    })
  },
  create(req, res) {
    return res.render("teachers/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Preencha todos os campos por favor");
    }

    Teacher.create(req.body, (teacher) => {
      return res.redirect(`teachers/${teacher.id}`)
    })

  },
  show(req, res) {
    Teacher.getById(req.params.id, (teacher) => {
      teacher.birth = date(teacher.birth).birthDay;
      teacher.lessioning = teacher.lessioning.split(",");
      teacher.created_at = date(teacher.created_at).format;
      return res.render("teachers/show", {teacher});
    })
  },
  edit(req, res) {
    Teacher.getById(req.params.id, (teacher) => {
      teacher.birth = date(teacher.birth).iso;
      return res.render("teachers/edit", { teacher });
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Preencha todos os campos por favor");
    }

    Teacher.update(req.body, () => {
      return res.redirect(`teachers/${req.body.id}`)
    })
  },
  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect("teachers");
    })
  }
};
