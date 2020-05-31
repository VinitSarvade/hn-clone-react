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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Application started on PORT ${PORT}`);
});
