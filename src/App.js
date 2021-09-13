import React from "react";
import "./App.css";

import { getAllStudents } from "./client";

import { Avatar, Spin, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Container from "./Container";

const getIndicatorIcon = () => (
  <LoadingOutlined style={{ fontSize: 24 }} spin />
);

class App extends React.Component {
  state = {
    students: [],
    isFetching: false,
  };

  componentDidMount() {
    this.fetchAllStudents();
  }
  fetchAllStudents() {
    this.setState({ isFetching: true });
    getAllStudents().then((res) =>
      res.json().then((students) => {
        //console.log(students);
        this.setState({
          students: students,
          isFetching: false,
        });
      })
    );
  }

  render() {
    const columns = [
      {
        title: "",
        key: "avatar",
        render: (texxt, student) => (
          <Avatar size="large">
            {`${student.firstName.charAt(0)} ${student.lastName.charAt(0)}`}
          </Avatar>
        ),
      },
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
        {this.state.isFetching ? (
          <Container>
            <Spin indicator={getIndicatorIcon} />
          </Container>
        ) : (
          <Container>
            {this.state.students && this.state.students.length ? (
              <Table
                dataSource={this.state.students}
                columns={columns}
                pagination={false}
                rowKey="studentId"
              />
            ) : (
              <h3>No students found</h3>
            )}
          </Container>
        )}
      </>
    );
  }
}

export default App;
