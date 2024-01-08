import React from "react";
import { renderToString } from "react-dom/server";
import { matchPath } from "react-router";
import { StaticRouter } from "react-router-dom";
import path from "path";
import fs from "fs";
import { load } from "cheerio";

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
      try {
        serverData = await matchedRoute.component.getStaticProps(req);
        serverData.hits = serverData.hits.map((hit) => ({
          author: hit.author,
          created_t_i: hit.created_at_i,
          num_comments: hit.num_comments,
          points: hit.points,
          title:
            hit.title || hit.story_title || hit.comment_text || hit.story_text,
          story_url: hit.story_url,
          url: hit.url,
          objectID: hit.objectID,
        }));
      } catch {
        serverData = {};
      }
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
      const $ = load(html);
      $("#root").append(appString);
      $("#preload").append(
        `window.__PRELOADED_DATA__ = ${JSON.stringify(serverData)};`
      );
      return res.send($.html());
    });
  }
};

export default serverRenderer;
