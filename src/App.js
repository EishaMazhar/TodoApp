import React from "react";
import "./App.css";
import Todos from "./components/Todos";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/todos" component={Todos} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  );
}

export default App;
