import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Main from "./MainComponent.js";
import Header from "./HeaderComponent.js";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <br />
        <Main />
      </div>
    );
  }
}

export default App;
