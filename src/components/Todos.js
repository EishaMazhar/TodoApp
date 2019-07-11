import React, { Component } from "react";
import axios from "axios";
import Listview from "./Listview";
import { Input } from "antd";
import { Button } from "antd";
import { Select } from "antd";
// import { TimePicker } from "antd";
// import moment from "moment";
const { Option } = Select;

class Todos extends Component {
  state = {
    name: "",
    priority: "",
    date: ""
    // completed: false
  };
  taskSubmit = event => {
    event.preventDefault();
    axios
      .post("https://todo-application-tabinda.herokuapp.com/todos", this.state)
      .then(val => console.log(val))
      .catch(err => console.log(err));
  };
  ontaskChange = event => {
    this.setState({ name: event.target.value });
  };
  onPriorityChange = event => {
    this.setState({ priority: event });
  };
  onDateChange = event => {
    this.setState({ date: event.target.value });
  };
  render() {
    return (
      <div>
        <h1>TODO APP</h1>
        <Input
          placeholder="Add Task"
          defaultValue={this.state.task}
          onChange={this.ontaskChange}
        />
        {/* <TimePicker
          defaultValue={moment().format("MMMM Do YYYY, h:mm:ss a, dddd")}
        /> */}
        <input
          type="datetime-local"
          name="duedate"
          onChange={this.onDateChange}
        />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select priority"
          optionFilterProp="children"
          onChange={this.onPriorityChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          <Option value="High">High</Option>
          <Option value="Medium">Medium</Option>
          <Option value="Low">Low</Option>
        </Select>{" "}
        <Button type="primary" onClick={this.taskSubmit}>
          AddTask
        </Button>
        <div style={{ margin: "10px 50px", backgroundColor: "red" }}>
          <Listview />
        </div>
      </div>
    );
  }
}

export default Todos;
