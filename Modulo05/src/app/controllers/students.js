const { date, grade, editGradeShow } = require("../../lib/utils");
const Student = require("../database/Student");

module.exports = {
  index(req, res) {
    Student.all((students) => {  
      return res.render("students/index", {students});
    })
  },
  create(req, res) {
    Student.getTeachersOption((options) => {
      return res.render("students/create", { teachersOptions: options });
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Preencha todos os campos por favor");
    }

    Student.create(req.body,
      (student) => {
          return res.redirect(`students/${student.id}`);
      })
  },
  show(req, res) {
    Student.getById(req.params.id,
      (student) => {
        if (!student) return res.send("Student Not Found");
        console.log(student)
        student.birth = date(student.birth).birthDay
        student.created_at = date(student.created_at).format;
        return res.render("students/show", { student });
      })
  },
  edit(req, res) {
    Student.getById(req.params.id,
      (student) => {
        if (!student) return res.send("Student Not Found");
        student.birth = date(student.birth).iso;
        student.grade = editGradeShow(student.grade);

        Student.getTeachersOption((options) => {
          return res.render("students/edit", { student , teachersOptions : options});
        })
    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Preencha todos os campos por favor");
    }

    Student.update(req.body,
      () => {
        return res.redirect(`students/${req.body.id}`);
    })
  },
  delete(req, res) {
    Student.delete(req.body.id,
      () => {
        return res.redirect("students");
      })
  }
};
