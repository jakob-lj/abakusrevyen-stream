import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./components/Landing";
import Chat from "./components/Chat";
import StreamingApp from "./components/StreamingApp";
import DigitalTicket from "./pages/DigitalTicket";
import Stream from "./pages/Stream";
import Background from "./components/Background";
import Login from "./pages/Login";
import InternalView from "./pages/InternalView";

const Routes = () => {
  const DefaultView = DigitalTicket;
  return (
    <div>
      <Router>
        <Background>
          <Switch>
            <Route path={"/digital-billett"} component={DigitalTicket} />
            <Route path={"/stream"} component={StreamingApp} />
            <Route path={"/Chat"} component={Chat} />
            <Route path={"/login/:token"} component={Login} />
            <Route path={"/internal"} component={InternalView} />
            <Route path={"/"} component={DefaultView} />
          </Switch>
        </Background>
      </Router>
    </div>
  );
};

/* <Route path={"/Landing"} component={Landing} />
<Route path={"/StreamingApp"} component={StreamingApp} />
<Route path={"/Chat"} component={Chat} /> */
export default Routes;
