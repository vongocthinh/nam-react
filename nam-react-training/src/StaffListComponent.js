import React, { Component } from "react";
import { Card, CardText, CardImg, CardBody, CardTitle } from "reactstrap";
import dateFormat from "dateformat";
import Pagination from "./PaginationComponent.js";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      currentPage: 1,
    };
  }

  numberOfElementsAfterPagination = (page) => {
    this.setState({
      currentPage: page.value,
    });
  };

  onStaffSelected(Staff) {
    this.setState({ selectedStaff: Staff });
  }

  renderStaff(Staff) {
    if (Staff != null) {
      return (
        <Card>
          <CardBody>
            <h1>{Staff.name}</h1>
            <CardText>
              Ngày sinh: {dateFormat(Staff.doB, "dd/mm/yyyy")}
            </CardText>
            <CardText>
              Ngày vào công ty: {dateFormat(Staff.startDate, "dd/mm/yyyy")}
            </CardText>
            <CardText>Phòng ban: {Staff.department.name} </CardText>
            <CardText>Hệ số lương: {Staff.salaryScale} </CardText>
            <CardText>Số ngày nghỉ còn lại: {Staff.annualLeave}</CardText>
            <CardText>Số ngày đã làm thêm: {Staff.overTime}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    const indexCurrentPage = this.state.currentPage - 1;
    const staff = this.props.Staffs.slice(
      indexCurrentPage * 6,
      indexCurrentPage * 6 + 6
    ).map((Staff) => {
      const uniqueid = uuidv4();
      return (
        <Card key={uniqueid} onClick={() => this.onStaffSelected(Staff)}>
          <Link to={`${Staff.id}`}>
            <CardImg src={Staff.image} alt={Staff.image} />
            <CardTitle style={{ textAlign: "center" }}>{Staff.name}</CardTitle>
          </Link>
        </Card>
      );
    });

    return (
      <div className="container-fluid">
        <div className="wrapper">{staff}</div>
        <Pagination Pagination={this.numberOfElementsAfterPagination} />
        <div style={{ paddingTop: "50px" }}>
          Bấm vào tên Nhân Viên để xem thông tin cụ thể.
        </div>
        <div className="col-sm-12 col-md-6">
          {this.renderStaff(this.state.selectedStaff)}
        </div>
      </div>
    );
  }
}

export default StaffList;
