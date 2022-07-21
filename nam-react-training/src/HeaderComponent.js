import { Component } from "react";
import { Nav, Navbar, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
class Header extends Component {
  render() {
    return (
      <div>
        <Navbar
          dark
          expand="md"
          style={{ margin: 0 + "em", backgroundColor: "Dodgerblue" }}
        >
          <Nav navbar>
            <NavItem style={{ display: "inline-flex" }}>
              <NavLink className="nav-link" to="/Nhanvien">
                <span style={{ fontSize: "20px" }}>Nhân viên</span>
              </NavLink>
              <NavLink
                style={{ paddingLeft: "20px" }}
                className="nav-link"
                to="/Phongban"
              >
                <span style={{ fontSize: "20px" }}>Phòng ban</span>
              </NavLink>
              <NavLink
                style={{ paddingLeft: "20px" }}
                className="nav-link"
                to="/Bangluong"
              >
                <span style={{ fontSize: "20px" }}>Bảng lương</span>
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
export default Header;
