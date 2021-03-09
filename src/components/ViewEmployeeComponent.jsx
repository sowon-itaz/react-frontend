import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ViewEmployeeComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      employee: {},
    };
  }

  componentDidMount() {
    EmployeeService.getEmployeeById(this.state.id).then(res => {
      this.setState({ employee: res.data });
    });
  }

  goHome() {
    this.props.history.push("/employees");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="card col-md-6 offset-md-3">
          <h3 className="text-center"> 정보보기</h3>
          <div className="card-body">
            <div className="row">
              <label> 이름 : </label>
              <div> {this.state.employee.firstName}</div>
            </div>
            <div className="row">
              <label> 성 : </label>
              <div> {this.state.employee.lastName}</div>
            </div>
            <div className="row">
              <label> Email ID: </label>
              <div> {this.state.employee.emailId}</div>
            </div>
            <div>
              <button className="btn btn-info" onClick={() => this.goHome()}>
                목록으로
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewEmployeeComponent;
