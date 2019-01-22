const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const PORT = process.env.PORT || 3000;

const loadServer = () => {
  const express = require("express");
  const server = express();

  server.get("/", (req, res) => {
    app.render(req, res, "/");
  });

  server.get("/p/:id", (req, res) => {
    const actualPage = "/post";
    const queryParams = { title: req.params.id };
    app.render(req, res, actualPage, queryParams);
  });

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
};

app
  .prepare()
  .then(loadServer)
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
