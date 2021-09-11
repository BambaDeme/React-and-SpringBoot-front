import React from "react";
import "./App.css";

import { getAllStudents } from "./client";

import { Table } from "antd";
class App extends React.Component {
  state = {
    students: [],
  };

  componentDidMount() {
    this.fetchAllStudents();
  }
  fetchAllStudents() {
    getAllStudents().then((res) =>
      res.json().then((students) => {
        console.log(students);
        this.setState({
          students: students,
        });
      })
    );
  }

  render() {
    const columns = [
      {
        title: "Student Id",
        dataIndex: "studentId",
        key: "studentId",
      },
      {
        title: "First Name",
        dataIndex: "firstName",
        key: "firstName",
      },
      {
        title: "Last Name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Gender",
        dataIndex: "gender",
        key: "gender",
      },
    ];
    return (
      <>
        <h1>Liste of students from spring api</h1>
        {this.state.students && this.state.students.length ? (
          <Table
            dataSource={this.state.students}
            columns={columns}
            rowKey="studentId"
          />
        ) : (
          <h3>No students found</h3>
        )}
      </>
    );
  }
}

export default App;
