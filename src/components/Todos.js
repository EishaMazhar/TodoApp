import React, { Component } from "react";
import "./Todos.css";
import "../App.css";
// import loader from "./loader";
import Loader from "react-loader-spinner";
import { API_URL, TODOS } from "../Constants";
import api_services from "../Services/api.service";
import {
  Input,
  Button,
  Select,
  DatePicker,
  Card,
  PageHeader,
  message
} from "antd";
message.config({
  top: 100,
  duration: 5,
  maxCount: 3
});
const { RangePicker } = DatePicker;

const { Option } = Select;

class Todos extends Component {
  constructor(props) {
    super(props);
    this.api = new api_services();
  }
  state = {
    list: [],
    name: "",
    priority: "",
    date: "",
    f_dateStart: "",
    f_dateEnd: "",
    f_priority: "",
    f_name: "",
    profile: {},
    isLoading: true,
    isAdded: false,
    itemFound: false
  };

  successAdd = () => {
    this.setState({ isAdded: false });
    message.success("Task Added");
  };

  // adds the item to database
  taskSubmit = event => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const obj = {
      name: this.state.name,
      priority: this.state.priority,
      date: this.state.date
    };
    this.api
      .addTask(token, obj)
      .then(val =>
        this.setState({
          list: this.state.list.concat(val.data),
          name: "",
          priority: "",
          date: "",
          isAdded: true
        })
      )
      .catch(err => message.error("Task not added"));
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
    const token = localStorage.getItem("token");
    this.api
      .searchTask(mystr, token)
      .then(val => this.setState({ list: val.data, itemFound: true }))
      .then(
        this.setState({
          f_dateEnd: "",
          f_dateStart: "",
          f_name: "",
          f_priority: ""
        })
      )
      .catch(err => message.error("Search Unsuccessful"));
  };
  successSearch = () => {
    this.setState({ itemFound: false });
    message.success("Search Successful");
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
  // demoAsyncCall = () =>
  //   new Promise(resolve => setTimeout(() => resolve(), 2500));
  // getting the items from the mongodb
  componentDidMount() {
    // demoAsyncCall().then(() => this.setState({ isloading: false }));
    const token = localStorage.getItem("token");
    this.api
      .getProfile(token)
      .then(val => this.setState({ profile: val.data, isLoading: false }))
      .catch(err => console.log(err));
    if (!token) {
      this.props.history.push("/login");
    }
    this.api
      .getItems(token)
      .then(val => this.setState({ list: val.data }))
      .then(message.success("You are all set"))
      .catch(err => message.error("Error while fetching Items"));
  }
  onDelete = id => {
    const token = localStorage.getItem("token");
    this.api
      .deleteTodo(id, token)
      .then(val =>
        this.setState({ list: this.state.list.filter(item => item._id !== id) })
      )
      .then(message.success("Delete Successful"))
      .catch(err => message.error("Delete Unsuccessful"));
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

  ontaskChange = event => {
    this.setState({ name: event.target.value });
  };
  onPriorityChange = event => {
    this.setState({ priority: event });
  };

  onDateChange = dateString => {
    this.setState({ date: dateString });
  };
  removeToken = () => {
    localStorage.removeItem("token");
    this.props.history.push("/login");
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <Loader type="Circles" color="grey" height="100vh" width={100} />
        </div>
      );
    } else
      return (
        <div>
          {this.state.isAdded ? this.successAdd() : ""}
          {this.state.itemFound ? this.successSearch() : ""}
          <div>
            <PageHeader className="Appheader">
              <h1>TODO APP</h1>
              <div>
                {" "}
                <h2
                  style={{
                    float: "left",
                    position: "absolute",
                    top: "30%"
                  }}
                >
                  Welcome, {this.state.profile.userName}
                </h2>
                <Button
                  type="danger"
                  style={{
                    float: "right",
                    position: "absolute",
                    top: "30%",
                    right: "10%"
                  }}
                  onClick={this.removeToken}
                >
                  {" "}
                  Logout
                </Button>
              </div>
            </PageHeader>
          </div>
          <br />
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
                placeholder="Select priority"
                style={{ width: 200 }}
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
                  placeholder="Select Priority"
                  optionFilterProp="children"
                  onChange={this.getPriority}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  value={this.state.f_priority}
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
