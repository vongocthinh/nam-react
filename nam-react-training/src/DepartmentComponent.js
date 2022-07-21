import React from "react";
import { Card } from "reactstrap";

function Department(props) {
  const Dept = props.Departments.map((Dept) => {
    return (
      <div
        key={Dept.id}
        className="col-sm-12 col-md-6 col-xl-4"
        style={{ padding: "1em" }}
      >
        <Card
          style={{
            padding: "10px",
            backgroundImage: "linear-gradient(#0dcaf0 50%, #f8f9fa 50%",
          }}
        >
          <h3>{Dept.name}</h3>
          <p>Số Lượng Nhân Viên : {Dept.numberOfStaff}</p>
        </Card>
      </div>
    );
  });

  return (
    <div className="container-fluid">
      <div className="row">{Dept}</div>
    </div>
  );
}
export default Department;
