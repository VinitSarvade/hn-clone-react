import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import NewsContainer from "containers/news";
import Navbar from "components/navabar";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <BrowserRouter>
          <Switch>
            <Route path="/" component={NewsContainer} />
          </Switch>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
