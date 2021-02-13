const { age, graduation, date } = require("../../lib/utils");
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
    return;
  },
  edit(req, res) {
    return;
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Preencha todos os campos por favor");
    }

    return;
  },
  delete(req, res) {
    Teacher.delete(req.body.id, () => {
      return res.redirect("teachers/index");
    })
  }
};
