import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class CreateEmployeeComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id, //라우터로부터 id 받아옴
      firstName: "",
      lastName: "",
      emailId: "",
    };
    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      //add인 경우
      return;
    } else {
      //update인 경우
      EmployeeService.getEmployeeById(this.state.id).then(res => {
        let employee = res.data;
        this.setState({
          firstName: employee.firstName,
          lastName: employee.lastName,
          emailId: employee.emailId,
        });
      });
    }
  }

  saveOrUpdateEmployee = e => {
    e.preventDefault();
    let employee = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      emailId: this.state.emailId,
    };
    if (this.state.id === "_add") {
      //add인 경우
      EmployeeService.createEmployee(employee).then(res => {
        this.props.history.push("/employees");
      });
    } else {
      //update인 경우
      EmployeeService.updateEmployee(employee, this.state.id).then(res => {
        this.props.history.push("/employees");
      });
    }
  };

  cancel() {
    this.props.history.push("/employees");
  }

  changeFirstNameHandler = event => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = event => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = event => {
    this.setState({ emailId: event.target.value });
  };

  //C인지 U인지에 따라서 페이지제목 바꾸기
  getTitle() {
    if (this.state.id === "_add") {
      //Create인경우
      return <h3 className="text-center">학생 정보 등록하기</h3>;
    } else {
      //update인 경우
      return <h3 className="text-center">학생 정보 수정하기</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> First Name: </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Last Name: </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label> Email Id: </label>
                    <input
                      placeholder="Email Address"
                      name="emailId"
                      className="form-control"
                      value={this.state.emailId}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateEmployee}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateEmployeeComponent;
