import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavItem } from "reactstrap";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container-fluid">
            <Navbar style={{ height: 0 + "em", backgroundColor: "Dodgerblue" }}></Navbar>
      </div>
    );
  }
}
export default Header;
