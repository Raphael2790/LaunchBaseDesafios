const express = require("express");
const nunjucks = require("nunjucks");
const routes = require("./routes");
const methodOverride = require("method-override");

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));
server.use(methodOverride("_method"));
server.use(routes);
server.set("view engine", "njk");

nunjucks.configure("src/app/views", {
  express: server,
  autoescape: false, //faz o nunjucks interpretar html
  noCache: true
});

server.listen(5000, (err) => {
  if (err) {
    return `Erro ${err}`;
  }
  return "Servidor rodando na porta 5000";
});
