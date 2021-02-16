const { date } = require("../../lib/utils");
const { instructorsOption } = require("../database/Member");

const Member = require("../database/Member");

module.exports = {
  index(req, res) {
    Member.all((members) => {
      return res.render("members/index", { members});
    })
  },
  show(req, res) {
    Member.getById(req.params.id, function (member) {
      if (!member) return res.send("Member not found!");
      member.birth = date(member.birth).birthDay;
     
      return res.render("members/show", { member });
    })
  },
  create(req, res) {
    Member.instructorsSelectOptions((options) => {
      return res.render("members/create", {instructorsOptions : options});
    })
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Por favor preencha todos os campos");
    }

    Member.create(req.body, (member) => {
      return res.redirect(`/members/${member.id}`);
    });
  },
  edit(req, res) {
    Member.getById(req.params.id, function (member) {
      if (!member) return res.send("Member not found!");
      member.birth = date(member.birth).iso;
      
      Member.instructorsSelectOptions((options) => {
        return res.render("members/edit", { member, instructorsOptions: options });
      })

    })
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "")
        return res.send("Por favor preencha todos os campos");
    }

    Member.update(req.body, () => {
      return res.redirect(`members/${req.body.id}`)
    })

    return;
  },
  delete(req, res) {
    Member.delete(req.body.id, () => {
      return res.redirect("/members");
      })
  }
};


