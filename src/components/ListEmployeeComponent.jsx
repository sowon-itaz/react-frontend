import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class ListEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: [],
    };
    this.addEmployee = this.addEmployee.bind(this);
    this.editEmployee = this.editEmployee.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  deleteEmployee(id) {
    // rest api
    EmployeeService.deleteEmployee(id).then(res => {
      this.setState({
        employees: this.state.employees.filter(employee => employee.id !== id),
      });
    });
  }

  viewEmployee(id) {
    this.props.history.push(`/view-employee/${id}`);
  }

  editEmployee(id) {
    // this.props.history.push(`/update-employee/${id}`);
    this.props.history.push(`/add-employee/${id}`);
  }

  componentDidMount() {
    EmployeeService.getEmployees().then(res => {
      this.setState({ employees: res.data });
    });
  }

  addEmployee() {
    this.props.history.push("/add-employee/_add");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">학생리스트</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addEmployee}>
            추가
          </button>
        </div>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th> 학생 First Name</th>
                <th> 학생 Last Name</th>
                <th> 학생 Email Id</th>
                <th> Actions</th>
              </tr>
            </thead>
            <tbody>
              {/*map함수: for in처럼 사용가능 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map */}
              {this.state.employees.map(employee => (
                <tr key={employee.id}>
                  <td> {employee.firstName} </td>
                  <td> {employee.lastName} </td>
                  <td> {employee.emailId} </td>
                  <td>
                    <button
                      onClick={() => this.editEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      Update{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteEmployee(employee.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewEmployee(employee.id)}
                      className="btn btn-info"
                    >
                      View{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListEmployeeComponent;
