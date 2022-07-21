import React, { Component } from "react";
import { CardTitle } from "reactstrap";
import { STAFFS } from "./data/staffs";

class Pagination extends Component {
  render() {
    const staffLen = STAFFS.length;
    let totalPage = (staffLen - (staffLen % 6)) / 6;
    if (staffLen % 6 !== 0) {
      totalPage++;
    }
    let pageArr = [];
    for (let i = 0; i < totalPage; i++) {
      let page = {
        id: i,
        value: i + 1,
      };
      pageArr.push(page);
    }

    const pages = pageArr.map((page) => {
      return (
        <div key={page.id}>
          <div onClick={() => this.props.Pagination(page)}>
            <CardTitle>{page.value}</CardTitle>
          </div>
        </div>
      );
    });
    return (
      <div className="container-fluid">
        <div className="wrapper page">{pages}</div>
      </div>
    );
  }
}

export default Pagination;
