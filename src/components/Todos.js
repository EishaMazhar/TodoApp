import React, { Component } from "react";
import "./Todos.css";
import "../App.css";
import axios from "axios";
import { API_URL, TODOS } from "../Constants";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Card,
  Icon,
  PageHeader
} from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;

class Todos extends Component {
  state = {
    list: [],
    name: "",
    priority: "",
    date: "",
    f_dateStart: "",
    f_dateEnd: "",
    f_priority: "",
    f_name: ""
  };

  searchDisplay = () => {
    let mystr = `${API_URL}${TODOS}`;
    if (this.state.f_name !== "") {
      mystr += `?name=${this.state.f_name}`;
    }
    if (this.state.f_priority !== "" && this.state.f_priority !== "All") {
      if (this.state.f_name !== "") {
        mystr += `&priority=${this.state.f_priority}`;
      } else {
        mystr += `?priority=${this.state.f_priority}`;
      }
    }
    if (this.state.f_dateStart !== "" && this.state.f_dateEnd !== "") {
      if (this.state.f_name !== "" || this.state.f_priority !== "") {
        mystr += `&from=${this.state.f_dateStart}&to=${this.state.f_dateEnd}`;
      } else {
        mystr += `?from=${this.state.f_dateStart}&to=${this.state.f_dateEnd}`;
      }
    }
    axios
      .get(mystr)
      .then(val => this.setState({ list: val.data }))
      .then(
        this.setState({
          f_dateEnd: "",
          f_dateStart: "",
          f_name: "",
          f_priority: ""
        })
      )
      .catch(err => console.log(err));
  };

  getPriority = event => {
    this.setState({ f_priority: event });
  };

  searchName = event => {
    this.setState({ f_name: event.target.value });
  };

  DateInterval = (value, dateString) => {
    this.setState({ f_dateStart: dateString[0] });
    this.setState({ f_dateEnd: dateString[1] });
  };

  // getting the items from the mongodb
  componentDidMount() {
    const token = localStorage.getItem("token");
    console.log({
      Authorization: `Bearer ${token}`
    });
    axios
      .get(`${API_URL}${TODOS}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(val => this.setState({ list: val.data }))
      .catch(err => console.log(err));
  }
  onDelete = id => {
    console.log(id);
    axios
      .delete(`${API_URL}${TODOS}${id}`)
      .then(val =>
        this.setState({ list: this.state.list.filter(item => item._id !== id) })
      )
      .catch(err => console.log(err));
  };
  getListItems = () =>
    this.state.list.map((i, key) => {
      return (
        <div
          key={key}
          style={{
            background: "#ECECEC"
          }}
        >
          <Card.Grid
            title=""
            style={{
              backgroundColor: "white",
              display: "inline-block"
            }}
          >
            <h3>{i.name}</h3>
            <p>{i.date}</p>
            <p>{i.priority}</p>
            <Button type="danger" onClick={() => this.onDelete(i._id)}>
              Delete
            </Button>
          </Card.Grid>
        </div>
      );
    });

  // adds the item to database
  taskSubmit = event => {
    event.preventDefault();
    const obj = {
      name: this.state.name,
      priority: this.state.priority,
      date: this.state.date
    };
    const token = localStorage.getItem("token");
    axios
      .post(`${API_URL}${TODOS}`, obj, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(val =>
        this.setState({
          list: this.state.list.concat(val.data),
          name: "",
          priority: "",
          date: ""
        })
      )
      .catch(err => console.log(err));
  };
  ontaskChange = event => {
    this.setState({ name: event.target.value });
  };
  onPriorityChange = event => {
    this.setState({ priority: event });
  };

  onDateChange = dateString => {
    this.setState({ date: dateString });
  };
  render() {
    return (
      <div>
        {/* <nav className="NavBar">
          <ul>
            <li className="Logo">TODO APP</li>
            <li className="addItem">
              <Icon type="plus-circle" />
            </li>
          </ul>
        </nav> */}
        <PageHeader className="Appheader">
          <h1>TODO APP</h1>
        </PageHeader>
        {/* <Icon type="plus-circle" style={{ align: "right" }} /> */}
        <div className="listItems">
          <div>
            <Input
              placeholder="Add Task"
              value={this.state.name}
              onChange={this.ontaskChange}
            />
            <DatePicker
              showTime
              placeholder="Select due date"
              value={this.state.date}
              onChange={this.onDateChange}
            />
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select priority"
              value={this.state.priority}
              optionFilterProp="children"
              onChange={this.onPriorityChange}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>{" "}
            <Button type="primary" onClick={this.taskSubmit}>
              AddTask
            </Button>
          </div>
          <div style={{ margin: "10px 50px", backgroundColor: "white" }}>
            <div style={{ backgroundColor: "grey" }}>
              <Input
                placeholder="input search text"
                value={this.state.f_name}
                style={{ width: 200 }}
                onChange={this.searchName}
              />
              <RangePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                placeholder={["From", "To"]}
                onChange={this.DateInterval}
              />
              <Select
                showSearch
                style={{ width: 200 }}
                value={this.state.priority}
                placeholder="Select priority"
                optionFilterProp="children"
                onChange={this.getPriority}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="High">High</Option>
                <Option value="Medium">Medium</Option>
                <Option value="Low">Low</Option>
                <Option value="All">All</Option>
              </Select>
              <Button
                type="primary"
                shape="round"
                icon="search"
                size="default"
                onClick={this.searchDisplay}
              />
              <Card>{this.getListItems()}</Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Todos;
