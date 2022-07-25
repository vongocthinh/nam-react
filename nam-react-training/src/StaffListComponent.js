import React, { Component } from "react";
import dateFormat from "dateformat";
import Pagination from "./PaginationComponent.js";
import { v4 as uuidv4 } from "uuid";
import Search from "./SearchComponent";
import {
  Card,
  CardImg,
  CardTitle,
  Row,
  FormGroup,
  Label,
  Input,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormFeedback,
  CardText,
  CardBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Button, Modal } from "reactstrap";

class StaffList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,
      modal: false,
    };
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
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
    } else {
      return <div></div>;
    }
  }

  handleSubmit = (value) => {
    //  event.preventDefault();
    // const doBValue = new Date(value.doB).toISOString();
    // const startDateValue = new Date(value.startDate).toISOString();
    // const DepartmentValue =
    //   props.Departments[document.querySelector("#department").value];
    // const salaryScaleValue = parseInt(value.salaryScale);
    // const annualLeaveValue = parseInt(value.annualLeave);
    // const overTimeValue = parseInt(value.overTime);

    const newStaff = {
      name: value.name,
      // doB: doBValue,
      // startDate: startDateValue,
      // department: DepartmentValue,
      // salaryScale: salaryScaleValue,
      // annualLeave: annualLeaveValue,
      // overTime: overTimeValue,
      image: "/assets/images/alberto.png",
    };
    this.props.onAdd(newStaff);
    console.log(newStaff);
  };
  render() {
    let modal = false;
    const indexCurrentPage = this.props.currentPage - 1;
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
    const required = (val) => val && val.length > 0;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => (val && val.length >= len) || !val;
    var dateReg = (val) => val && val.length > 0;
    return (
      <div className="container-fluid">
        <div style={{ display: "flex" }}>
          {/*add Staff*/}
          <div style={{ display: "flex", width: "50%" }}>
            <div
              style={{
                border: "5px solid blue",
                fontSize: "25px",
                textAlign: "center",
                padding: "1rem",
                width: "70%",
                fontWeight: "700",
                fontStyle: "italic",
              }}
            >
              Thêm nhân viên
            </div>
            <Button
              style={{ height: "100%", width: "30%" }}
              color="primary"
              onClick={() => this.toggleModal(this.state.modal)}
            >
              ADD
            </Button>
            <Modal
              style={{ width: "900px", maxWidth: "100%" }}
              isOpen={this.state.modal}
            >
              <div>
                <LocalForm
                  className="form-container"
                  id="form-container"
                  onSubmit={(value) => this.handleSubmit(value)}
                >
                  <ModalHeader>Thông tin nhân viên</ModalHeader>
                  <ModalBody>
                    <Row className="row" id="form-group">
                      <Label
                        className="col-sm-12 col-md-4 col-xl-3"
                        htmlFor="name"
                      >
                        Họ Và Tên
                      </Label>
                      <Control.input
                        model=".name"
                        className="col-sm-12 col-md-8 col-xl-9"
                        id="name"
                        name="name"
                        placeholder="Họ và tên"
                        validators={{
                          required: required,
                          minLength: minLength(3),
                          maxLength: maxLength(30),
                        }}
                      />
                      <span className="col-sm-12 col-md-4 col-xl-3"></span>
                      <Errors
                        model=".name"
                        className="text-danger col-sm-12 col-md-8 col-xl-9"
                        show="touched"
                        messages={{
                          required: "Yêu cầu nhập thông tin",
                          minLength: "Tên phải nhiều hơn 3 ký tự",
                          maxLength: " Tên phải ít hơn  ký tự",
                        }}
                      ></Errors>
                    </Row>
                    <Row className="row" id="form-group">
                      <Label
                        className="col-sm-12 col-md-4 col-xl-3"
                        htmlFor="doB"
                      >
                        Ngày Sinh
                      </Label>
                      <Control.input
                        model=".doB"
                        className="col-sm-12 col-md-8 col-xl-9"
                        type="date"
                        id="doB"
                        name="doB"
                        validators={{
                          dateReg,
                        }}
                      />
                      <span className="col-sm-12 col-md-4 col-xl-3"></span>
                      <Errors
                        model=".doB"
                        className="text-danger col-sm-12 col-md-8 col-xl-9"
                        show="touched"
                        messages={{
                          dateReg: "Vui long nhap ngay thang",
                        }}
                      ></Errors>
                    </Row>
                    <Row className="row" id="form-group">
                      <Label
                        className="col-sm-12 col-md-4 col-xl-3"
                        htmlFor="startDate"
                      >
                        Ngày vào công ty
                      </Label>
                      <Control.input
                        model=".startDate"
                        className="col-sm-12 col-md-8 col-xl-9"
                        type="date"
                        id="startDate"
                        name="startDate"
                        validators={{
                          dateReg,
                        }}
                      />
                      <span className="col-sm-12 col-md-4 col-xl-3"></span>
                      <Errors
                        model=".startDate"
                        className="text-danger col-sm-12 col-md-8 col-xl-9"
                        show="touched"
                        messages={{
                          dateReg: "Vui long nhap ngay thang",
                        }}
                      ></Errors>
                    </Row>
                    <Row className="row" id="form-group">
                      <Label
                        className="col-sm-12 col-md-4 col-xl-3"
                        htmlFor="department"
                      >
                        Phòng ban
                      </Label>
                    </Row>
                    <Row className="row" id="form-group">
                      <Label
                        className="col-sm-12 col-md-4 col-xl-3"
                        htmlFor="salaryScale"
                      >
                        Hệ số lương
                      </Label>
                      <Control.input
                        model=".salaryScale"
                        className="col-sm-12 col-md-8 col-xl-9"
                        type="number"
                        defaultValue={1}
                        name="salaryScale"
                      />
                    </Row>
                    <Row className="row" id="form-group">
                      <Label
                        className="col-sm-12 col-md-4 col-xl-3"
                        htmlFor="annualLeave"
                      >
                        Số ngày nghỉ còn lại
                      </Label>
                      <Control.input
                        model=".annualLeave"
                        className="col-sm-12 col-md-8 col-xl-9"
                        type="number"
                        defaultValue={0}
                        name="annualLeave"
                      />
                    </Row>
                    <Row className="row" id="form-group">
                      <Label
                        className="col-sm-12 col-md-4 col-xl-3"
                        htmlFor="overTime"
                      >
                        Số ngày làm thêm
                      </Label>
                      <Control.input
                        model=".overTime"
                        className="col-sm-12 col-md-8 col-xl-9"
                        type="number"
                        defaultValue={0}
                        name="overTime"
                      />
                    </Row>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      type="submit"
                      color="primary"
                      onClick={() => this.toggleModal()}
                    >
                      Thêm
                    </Button>
                  </ModalFooter>
                </LocalForm>
              </div>
            </Modal>
          </div>
          <div style={{ width: "100%" }}>
            <Search
              Search={this.props.Search}
              Pagination={this.props.Pagination}
            />
          </div>
        </div>

        <div className="wrapper">{staff}</div>
        <br />
        <Pagination
          Staffs={this.props.Staffs}
          Pagination={this.props.Pagination}
        />
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
