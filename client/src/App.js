import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Jokes from "./components/jokes";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <div className="App">
      Dad Jokes App!
      <Route exact path="/" render={props => <Register {...props} />} />
      <Route  exact path="/login" render={props => <Login {...props} />} />
      <PrivateRoute exact path="/jokes" component={Jokes} />

    </div>
  );
}

export default App;
