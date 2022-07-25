import React, { Component } from "react";
import StaffList from "./StaffListComponent";
import { DEPARTMENTS, STAFFS } from "./data/staffs.jsx";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import RenderStaff from "./RenderStaff.js";
import Department from "./DepartmentComponent.js";
import Salary from "./SalaryComponent.js";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Staffs: STAFFS,
      Departments: DEPARTMENTS,
      currentPage: 1,
    };
    this.addStaff = this.addStaff.bind(this);
  }

  addStaff = (staffAdd) => {
    const idF = this.state.Staffs.map((staff) => staff.id);
    const id = Math.max(...idF) + 1;
    const newStaff = { id, ...staffAdd };
    this.setState({
      Staffs: [...this.state.Staffs, newStaff],
    });
    console.log(newStaff);
    console.log(this.state.Staffs);
  };
  

  staffsAfterSearching = () => {
    const searchName = document.getElementById("SearchName").value;
    this.setState({
      Staffs: STAFFS.filter((each) => {
        if (each.name.match(eval("/" + searchName + "/gi")) != null) {
          return each;
        }
        return null;
      }),
    });
  };

  staffsAfterPagination = (page) => {
    if (page != null) {
      this.setState({
        currentPage: page.value,
      });
    } else {
      this.setState({
        currentPage: 1,
      });
    }
  };

  render() {
    const StaffWithId = () => {
      const id = useParams();
      return (
        <RenderStaff
          Staff={this.state.Staffs.filter(
            (Staff) => Staff.id === parseInt(id.id, 10)
          )}
        />
      );
    };

    return (
      <div>
        <Routes>
          <Route
            path="NhanVien"
            element={
              <StaffList
                Staffs={this.state.Staffs}
                Search={this.staffsAfterSearching}
                currentPage={this.state.currentPage}
                Pagination={this.staffsAfterPagination}
                onAdd={this.addStaff}
              />
            }
          />
          <Route path="NhanVien/:id" element={<StaffWithId />} />
          <Route
            path="PhongBan"
            element={<Department Departments={this.state.Departments} />}
          />
          <Route
            path="BangLuong"
            element={
              <Salary
                Staffs={this.state.Staffs}
                Search={this.staffsAfterSearching}
                currentPage={this.state.currentPage}
                Pagination={this.staffsAfterPagination}
              />
            }
          />
          <Route path="*" element={<Navigate to="/Nhanvien" />} />
        </Routes>
      </div>
    );
  }
}

export default Main;
