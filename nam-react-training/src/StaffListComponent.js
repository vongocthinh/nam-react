import React, { Component } from "react";
import { Card, CardText, CardBody, CardTitle } from "reactstrap";
import dateFormat from "dateformat";
import { STAFFS } from "./data/staffs";
class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
    };
  }

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
    }
  }

  render() {
    let staff = this.props.Staffs.slice(0,6).map((Staff) => {
      return (
        <div key={Staff.id}>
          <Card onClick={() => this.onStaffSelected(Staff)}>
            <CardTitle>{Staff.name}</CardTitle>
          </Card>
        </div>
      );
    });

    const staffLen = STAFFS.length;
    let totalPage = (staffLen - (staffLen % 6)) / 6;
    if (staffLen % 6 !== 0) {
      totalPage++;
    }
    // console.log(totalPage);
    let pageArr = [];
    for (let i = 0; i < totalPage; i++) {
      let page = {
        id: i,
        value: i + 1,
      };
      pageArr.push(page);
    }
    // console.log(pageArr);

    const pages = pageArr.map((page) => {
      return (
        <div key={page.id}>
          <div onClick={() => this.props.handle(page)}>
            <CardTitle>{page.value}</CardTitle>
          </div>
        </div>
      );
    });

    return (
      <div className="container-fluid">
        <div className="wrapper">{staff}</div>
        <div className="wrapper page">{pages}</div>
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
