import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../shared/App";
import indexHtml from "./indexHtml";
import path from "path";
import fs from "fs";

const app = express();

app.use("/dist", express.static(path.join(__dirname, "../dist")));

app.get("/*", (req: express.Request, res: express.Response) => {
  fs.readFile(path.join(__dirname, "../dist/index.html"), (err, data) => {
    let html = data.toString();
    const markup = renderToString(
      <StaticRouter>
        <App />
      </StaticRouter>
    );
    html = html.replace("{{ markup }}", markup);
    res.send(html);
  });
});

app.listen(80, () => {
  console.log("ok");
});
