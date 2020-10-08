const fs = require("fs");
const data = require("../data.json");
const database = require("../data");

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

exports.edit = (req, res) => {
  const { id } = req.params;

  const recipe = data.recipes.find((recipe) => recipe.id == id);

  return res.render("edit", { css: "/admin.css", recipe });
};

exports.post = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "")
      return res.send("Por favor preencha todos os campos");
  }

  let {
    title,
    author,
    image,
    ingredients,
    preparation,
    information
  } = req.body;

  const _created_at = Date.now();
  const id = Number(data.recipes.length + 1);

  data.recipes.push({
    id,
    title,
    author,
    image,
    ingredients,
    preparation,
    information,
    _created_at
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (error) => {
    if (error) {
      return res.send("Aconteceu um erro ao gravar arquivo");
    }
    return res.redirect("/admin/recipes");
  });
};

exports.put = (req, res) => {};

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredRecipes = data.recipes.filter((recipe) => {
    return recipe.id != id;
  });

  console.log(filteredRecipes);

  data.recipes = filteredRecipes;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (error) => {
    if (error) {
      return res.send("Aconteceu um erro ao gravar o arquivo");
    }
    return res.redirect("/admin/recipes");
  });
};

exports.show = (req, res) => {
  const { id } = req.params;

  const recipe = data.recipes.find((recipe) => recipe.id == id);

  if (!recipe) {
    return res.send("Receita não encontrada");
  }

  return res.render("show", { css: "/admin.css", recipe });
};
