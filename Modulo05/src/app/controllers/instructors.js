const Instructor = require("../database/Instructor")
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Instructor.all((instructors) => {
      return res.render("instructors/index", { instructors});
    })
  },
  show(req, res) {
    const value = req.params.id
    Instructor.getById(value, (error, instructor) => {
      if (error) return res.send("Database error");
      if (!instructor) return res.send("Instructor not found!");
      instructor.birth = age(instructor.birth);
      instructor.service = instructor.services.split(",");
      instructor.created_at = date(instructor.created_at).format;
      return res.render("instructors/show", instructor)
    })
  },
  create(req, res) {
    return res.render("instructors/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Por favor preencha todos os campos");
    }

    Instructor.create(req.body, (instructor) => {
      return res.redirect(`/instructors/${instructor.id}`);
    });
  },
  edit(req, res) {
    return;
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Por favor preencha todos os campos");
    }

    return;
  },
  delete(req, res) {
    return;
  }
};
