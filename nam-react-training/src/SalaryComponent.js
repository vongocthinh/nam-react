import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import Pagination from "./PaginationComponent.js";

class Salary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }
  numberOfElementsAfterPagination = (page) => {
    this.setState({
      currentPage: page.value,
    });
  };
  render() {
    const indexCurrentPage = this.state.currentPage - 1;
    const staff = this.props.Staffs.slice(
      indexCurrentPage * 6,
      indexCurrentPage * 6 + 6
    ).map((Staff) => {
      const uniqueid = uuidv4();
      const salaryTotal =
        parseInt(Staff.salaryScale) * 3000000 +
        parseInt(Staff.overTime) * 200000;
      Staff = Object.assign(Staff, { salaryTotal: salaryTotal });
      return (
        <div
          key={uniqueid}
          className="col-sm-12 col-md-6 col-xl-4"
          style={{ padding: 1 + "rem" }}
        >
          <Card
            style={{
              padding: 0.4 + "rem",
              backgroundImage: "linear-gradient(#0dcaf0 20%, #f8f9fa 20%",
            }}
          >
            <Link
              to={`/Nhanvien/${Staff.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h4 style={{ textAlign: "center" }}>{Staff.name}</h4>
            </Link>
            <p style={{ paddingTop: "10px" }}> Mã Nhân Viên : {Staff.id}</p>
            <p> Hệ số lương: {Staff.salaryScale}</p>
            <p> Số ngày làm thêm: {Staff.overTime} </p>
            <label
              style={{
                backgroundColor: "#e3e3e3",
                border: "1px solid black",
                borderRadius: 10 + "px",
                textAlign: "center",
                fontSize: 22 + "px",
              }}
            >
              Lương: {Staff.salaryTotal}VND
            </label>
          </Card>
        </div>
      );
    });

    return (
      <div className="container-fluid">
        <div className="wrapper">{staff}</div>
        <Pagination Pagination={this.numberOfElementsAfterPagination} />
      </div>
    );
  }
}

export default Salary;
