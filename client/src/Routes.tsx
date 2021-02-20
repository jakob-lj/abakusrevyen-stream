import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import One from "./components/One";

const Routes = () => {
  return (
    <div>
      <Router>
        <Route path={"/one"} component={One} />
      </Router>
    </div>
  );
};

export default Routes;
