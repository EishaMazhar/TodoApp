import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "antd";
import { Input } from "antd";
const { Search } = Input;

//import { Card } from "antd";

class Listview extends Component {
  state = {
    list: []
  };
  componentDidMount() {
    axios
      .get("https://todo-application-tabinda.herokuapp.com/todos")
      .then(val => this.setState({ list: val.data }))
      .catch(err => console.log(err));
  }
  // componentWillReceiveProps(nextProps) {

  //   // if (nextProps.status === 200) {
  //   //   this.setState({ list: this.state.list.concat(nextProps) });
  //   // }
  //   // console.log(nextProps);
  // }
  getprops = props => {
    const obj = this.props.addState();
    this.setState({ list: this.state.list.concat(obj) });
  };
  onDelete = id => {
    console.log(id);
    axios
      .delete(`https://todo-application-tabinda.herokuapp.com/todos/${id}`)
      .then(val =>
        this.setState({ list: this.state.list.filter(item => item._id !== id) })
      )
      .catch(err => console.log(err));
  };

  getListItems = () =>
    this.state.list.map((i, key) => {
      return (
        <div key={key}>
          <Card type="inner" title="" style={{ backgroundColor: "white" }}>
            <h3>{i.name}</h3>
            <p>{i.date}</p>
            <p>{i.priority}</p>
            <Button type="danger" onClick={() => this.onDelete(i._id)}>
              Delete
            </Button>
          </Card>
        </div>
      );
    });

  searchId = task => {
    // this.state.list.filter(i=>)
  };
  render() {
    return (
      <div>
        <Search
          placeholder="input search text"
          onChange={this.searchId}
          enterButton
        />
        {this.getListItems()}
      </div>
    );
  }
}

export default Listview;
