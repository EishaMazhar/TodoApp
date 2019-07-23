import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, PageHeader, Card } from "antd";
import { Link } from "react-router-dom";
import api_services from "../Services/api.service";

class Login extends Component {
  constructor(props) {
    super(props);
    this.api = new api_services();
  }
  state = {
    username: "",
    password: "",
    profile: {}
  };

  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/todos");
    }
  }

  setToken = idToken => {
    localStorage.setItem("token", idToken);
    this.props.history.push({
      pathname: "/todos"
    });
  };

  onFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        //console.log("Received values of form: ", values);
        this.api
          .postLogin(values)
          .then(val => this.setToken(val.data.token))
          .catch(err => console.log(err));
      }
    });
  };

  onFChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <PageHeader className="Appheader">
          <h1>TODO APP</h1>
        </PageHeader>
        <Card
          title="LOGIN"
          // extra={<a href="#">More</a>}
          style={{
            width: "45%",
            margin: "50px auto",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
        >
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            style={{
              width: "100%",
              margin: "0 auto",
              height: "auto"
            }}
          >
            <Form.Item className="loginItems">
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  style={{ width: "20em" }}
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                  name="username"
                  setfieldsvalue={this.state.username}
                  onChange={this.onFChange}
                />
              )}
            </Form.Item>
            <Form.Item className="loginItems">
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  style={{ width: "20em" }}
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  name="password"
                  setfieldsvalue={this.state.password}
                  onChange={this.onFChange}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or <Link to="/Signup">Register Now!</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Login);

export default WrappedNormalLoginForm;
