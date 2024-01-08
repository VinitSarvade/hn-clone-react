import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./assets/styles/main.scss";
import App from "./containers/app";
import * as serviceWorker from "./serviceWorker";

const preloadedData = window.__PRELOADED_DATA__ || null;
delete window.__PRELOADED_DATA__;

ReactDOM.hydrate(
  <React.StrictMode>
    <BrowserRouter>
      <App data={preloadedData} />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
