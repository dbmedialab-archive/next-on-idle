const express = require("express");
const next = require("next");
const fs = require("fs");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const commonChunksFile = fs.readdirSync(`${__dirname}/.next/static/commons`);
const mainFileArr = commonChunksFile.filter(file => file.indexOf("main-") == 0);
const mainFile = mainFileArr[0];

const buildId = fs.readFileSync(`${__dirname}/.next/BUILD_ID`, {
  encoding: "utf-8"
});

console.log(`mainFile: ${mainFile}`);

app.prepare().then(() => {
  const server = express();

  server.get("/", (req, res) => {
    const data = { title: "Welcome from the express app" };
    req.query.data = data;
    if (req.query.api === "true") {
      req.query.data.title =
        "Welcome from the express app - Loaded from the client";
      return res.json(data);
    }
    return app.render(req, res, "/", req.query);
  });

  server.get(`/${buildId}/main.js`, (req, res) => {
    req.url = `/_next/static/commons/${mainFile}`;
    return handle(req, res);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
