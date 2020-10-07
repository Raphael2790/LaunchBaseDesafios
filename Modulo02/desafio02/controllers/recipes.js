const fs = require("fs");
const data = require("../data.json");

exports.index = (req, res) => {
  return res.render("index", { css: "/style.css" });
};

exports.about = (req, res) => {
  return res.render("sobre", { css: "/sobrestyle.css" });
};

exports.showAll = (req, res) => {
  return res.render("receitas", { css: "/receitas.css" });
};

exports.showOne = (req, res) => {
  const recipes = data;
  const recipeIndex = req.params.index;
  const filterRecipe = recipes.find((recipe) => recipe.title === recipeIndex);

  if (!filterRecipe) {
    return res.status(404).render("not-found", { css: "/style.css" });
  }

  return res.render("receita", { filterRecipe, css: "/receita.css" });
};

exports.indexAdmin = (req, res) => {
  return res.render("indexAdmin", { css: "/admin.css", recipes: data.recipes });
};

exports.create = (req, res) => {
  return res.render("create", { css: "/admin.css" });
};

exports.edit = (req, res) => {};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "")
      return res.send("Por favor preencha todos os campos");
  }
  res.send(req.body);
};

exports.put = (req, res) => {};

exports.delete = (req, res) => {};

exports.show = (req, res) => {};
