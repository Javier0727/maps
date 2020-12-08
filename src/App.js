import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home.page";
import Travel from "./pages/Travel.page";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/travel">
          <Travel />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
