import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import NewsContainer from "containers/news";
import Navbar from "components/navabar";

const App = () => {
  const location = useLocation();
  return (
    <>
      <Helmet>
        {location && (
          <link
            rel="canonical"
            href={`${process.env.REACT_APP_HOST}${location.pathname}`}
          />
        )}
      </Helmet>
      <Navbar />
      <div className="container">
        <Switch>
          <Route path="/" component={NewsContainer} />
        </Switch>
      </div>
    </>
  );
};

export default App;
