const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const methodOverride = require("method-override");

const server = express();
const PORT = 5050;

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(routes);
server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
});

server.use((req, res) => {
  return res.status(404).render("not-found", { css: "/style.css" });
});

server.listen(PORT, (err) => {
  if (err) {
    return `Erro ${err}`;
  }
  console.log(`Servidor rodando na porta ${PORT}`);
});
