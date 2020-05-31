import React from "react";
import { Switch, Route } from "react-router-dom";

import NewsContainer from "./containers/news";

export const routePaths = [{ path: "/", component: NewsContainer }];

const Routes = () => {
  return (
    <Switch>
      {routePaths.map((route) => (
        <Route path={route.path} component={route.component} key={route.path} />
      ))}
    </Switch>
  );
};

export default Routes;
