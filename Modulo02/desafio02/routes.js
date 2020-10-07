const express = require("express");
const recipes = require("./controllers/recipes");

const routes = express.Router();

routes.get("/", recipes.index);
routes.get("/sobre", recipes.about);
routes.get("/receitas", recipes.showAll);
routes.get("/receita/:id", recipes.showOne);

routes.get("/admin/recipes", recipes.indexAdmin);
routes.get("/admin/recipes/create", recipes.create);
routes.get("/admin/recipes/:id", recipes.show);
routes.get("/admin/recipes/:id/edit", recipes.edit);

routes.post("/admin/recipes", recipes.post);
routes.put("/admin/recipes", recipes.put);
routes.delete("/admin/recipes", recipes.delete);

module.exports = routes;
