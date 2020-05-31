import express from "express";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";

import serverRenderer from "./serverRenderer";

const app = express();

app.use(compression());
app.use(morgan("combined"));
app.use(helmet());

app.use("^/$", serverRenderer);
app.use(
  express.static(path.resolve(path.join(__dirname, "../../build")), {
    maxAge: "30d",
  })
);

app.listen(3000, () => {
  console.log("Application started on PORT 3000");
});
