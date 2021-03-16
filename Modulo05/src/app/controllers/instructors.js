const Instructor = require("../database/Instructor")
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    const { filter } = req.query;

    if (filter) {
      Instructor.getByName(filter, (instructors) => {
        return res.render("instructors/index", {instructors, filter});
      })
    } else {
      Instructor.all((instructors) => {
        return res.render("instructors/index", { instructors, filter});
      })
    }
  },
  show(req, res) {
    Instructor.getById(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found!");
      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");
      instructor.created_at = date(instructor.created_at).format;
      return res.render("instructors/show", { instructor });
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
    Instructor.getById(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found!");
      instructor.birth = date(instructor.birth).iso;
      
      return res.render("instructors/edit", { instructor });
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Por favor preencha todos os campos");
    }

    Instructor.update(req.body, () => {
      return res.redirect(`instructors/${req.body.id}`)
    })

    return;
  },
  delete(req, res) {
    Instructor.delete(req.body.id, () => {
      return res.redirect("/instructors");
      })
  }
};
