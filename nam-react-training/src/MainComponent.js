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
    };
  }

  staffsAfterPagination = (page) => {
    this.setState({
      Staffs: STAFFS.slice(page.id * 6, page.id * 6 + 6),
    });
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
                pagination={this.staffsAfterPagination}
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
            element={<Salary Staffs={this.state.Staffs} />}
          />
          <Route path="*" element={<Navigate to="/Nhanvien" />} />
        </Routes>
      </div>
    );
  }
}

export default Main;
