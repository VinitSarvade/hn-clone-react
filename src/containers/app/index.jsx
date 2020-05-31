import React from "react";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import Navbar from "../../components/navabar";
import Routes from "../../routes";
import DataContext from "./data-context";

const App = (props) => {
  const location = useLocation();
  const preloadedData = props.data || null;

  return (
    <DataContext.Provider value={preloadedData}>
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
        <Routes />
      </div>
    </DataContext.Provider>
  );
};

export default App;
