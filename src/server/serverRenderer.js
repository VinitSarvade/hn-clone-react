import React from "react";
import { renderToString } from "react-dom/server";
import { matchPath } from "react-router";
import { StaticRouter } from "react-router-dom";
import path from "path";
import fs from "fs";
import cheerio from "cheerio";

import App from "../containers/app";
import { routePaths } from "../routes";

const serverRenderer = async (req, res) => {
  const matchedRoute = routePaths.find((route) =>
    matchPath(req.path, {
      path: route.path,
      exact: true,
    })
  );

  if (matchedRoute) {
    let serverData;
    // Check if the component haas defined any static props method to get the data reqired for SSR
    if (matchedRoute.component.getStaticProps) {
      serverData = await matchedRoute.component.getStaticProps(req);
    }

    const htmlFile = path.resolve(__dirname, "..", "..", "build", "index.html");
    fs.readFile(htmlFile, "utf8", (err, html) => {
      if (err) {
        console.error("[HTML File Not Found]", err);
        return res.status(404).end();
      }

      const applicationRoot = (
        <StaticRouter location={req.url} context={{}}>
          <App data={serverData} />
        </StaticRouter>
      );

      const appString = renderToString(applicationRoot);
      const $ = cheerio.load(html);
      $("#root").append(appString);
      $("head").append(
        `<script>window.__INIT_DATA = ${JSON.stringify(serverData)}</script>`
      );
      return res.send($.html());
    });
  }
};

export default serverRenderer;
