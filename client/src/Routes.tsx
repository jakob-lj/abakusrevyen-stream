import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Chat from "./components/Chat";
import StreamingApp from "./components/StreamingApp";
import DigitalTicket from "./pages/DigitalTicket";

const Routes = () => {
  return (
    <div>
      <Router>
        <Route path={"/digital-billett"} component={DigitalTicket} />
        <Route path={"/Landing"} component={Landing} />
        <Route path={"/StreamingApp"} component={StreamingApp} />
        <Route path={"/Chat"} component={Chat} />
      </Router>
    </div>
  );
};

export default Routes;
