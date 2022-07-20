import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { STAFFS } from "./data/staffs.jsx";
import StaffList from "./StaffListComponent.js";
import Header from "./HeaderComponent.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Staffs: STAFFS,
    };
  }

  filterStaffs = (page) => {
    this.setState({
      Staffs: STAFFS.slice(page.id * 6, page.id * 6 + 6)
    })
  }

  render() {
    return (
      <div>
        <Header />
        <br />
        <StaffList Staffs={this.state.Staffs} handle={this.filterStaffs} />
      </div>
    );
  }
}

export default App;
