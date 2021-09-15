import React from "react";
import { Switch, Route, Redirect } from "react-router";

import PRA_Calc from "@pages/PRA_Calc";
import Workspace from "@layouts/Workspace";

const App = () => {
  return (
    <Switch>
      <Route path="/" component={Workspace} />
    </Switch>
  );
};

export default App;
