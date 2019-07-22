import React, { Component } from "react";
import axios from "axios";
import { Form, Icon, Card, Input, Button, PageHeader } from "antd";
//import { Checkbox } from "antd";
import { Link } from "react-router-dom";
import { API_URL, SIGNUP } from "../Constants";

class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    age: "",
    password: "",
    password2: "",
    validatep2: true
  };
  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log("Received values of form: ", values);
  //     }
  //   });
  // };
  componentDidMount() {
    if (localStorage.getItem("token")) {
      this.props.history.push("/todos");
    }
  }
  setToken = idToken => {
    localStorage.setItem("token", idToken);
  };

  onFormChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onPassword2Change = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.password !== event.target.value) {
      this.setState({ validatep2: false });
    } else {
      this.setState({ validatep2: true });
    }
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.validatep2) {
          // console.log("no error");
          axios
            .post(`${API_URL}${SIGNUP}`, values)
            .then(val => console.log(val))
            .catch(err => console.log(err));
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        {/* <nav className="NavBar">
          <ul>
            <li className="Logo">TODO APP</li>
          </ul>
        </nav> */}
        <PageHeader className="Appheader">
          <h1>TODO APP</h1>
        </PageHeader>

        <Card
          title="Sign Up"
          extra={<a href="#">More</a>}
          style={{
            width: "45%",
            margin: "50px auto",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
          }}
        >
          <Form
            onSubmit={this.handleSubmit}
            className="Signup-form"
            layout="vertical"
            style={{
              width: "100%",
              margin: "0 auto",
              height: "auto"
            }}
          >
            <div className="formItems">
              <Form.Item style={{ width: "45%" }}>
                {getFieldDecorator("firstname", {
                  rules: [
                    { required: true, message: "Please input your First Name!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="First Name"
                    name="firstname"
                    setfieldsvalue={this.state.firstname}
                    onChange={this.onFormChange}
                  />
                )}
              </Form.Item>
              <Form.Item style={{ width: "45%" }}>
                {getFieldDecorator("lastname", {
                  rules: [
                    { required: true, message: "Please input your Last Name!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Last Name"
                    name="lastname"
                    setfieldsvalue={this.state.lastname}
                    onChange={this.onFormChange}
                  />
                )}
              </Form.Item>
            </div>

            <div className="formItems">
              <Form.Item style={{ width: "45%" }}>
                {getFieldDecorator("username", {
                  rules: [
                    { required: true, message: "Please input your User Name!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="User Name"
                    name="username"
                    setfieldsvalue={this.state.username}
                    onChange={this.onFormChange}
                  />
                )}
              </Form.Item>
              <Form.Item style={{ width: "45%" }}>
                {getFieldDecorator("age", {
                  rules: [{ required: true, message: "Please input your Age!" }]
                })(
                  <Input
                    type="number"
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="Age"
                    name="age"
                    setfieldsvalue={this.state.age}
                    onChange={this.onFormChange}
                  />
                )}
              </Form.Item>
            </div>
            <Form.Item className="formItems">
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Please input your E-mail!" }
                ]
              })(
                <Input
                  type="email"
                  prefix={
                    <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="E-mail"
                  name="email"
                  setfieldsvalue={this.state.email}
                  onChange={this.onFormChange}
                />
              )}
            </Form.Item>
            <div className="formItems">
              <Form.Item style={{ width: "45%" }}>
                {getFieldDecorator("password", {
                  rules: [
                    { required: true, message: "Please input your Password!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Password"
                    name="password"
                    setfieldsvalue={this.state.password}
                    onChange={this.onFormChange}
                  />
                )}
              </Form.Item>
              <Form.Item
                style={{ width: "45%" }}
                validateStatus={this.state.validatep2 ? "" : "error"}
              >
                {getFieldDecorator("password2", {
                  rules: [
                    {
                      required: true,
                      message: "Please confirm your Password!"
                    },
                    {
                      validator: this.state.validatep2
                    }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    setfieldsvalue={this.state.password2}
                    onChange={this.onPassword2Change}
                  />
                )}
              </Form.Item>
            </div>
            <Form.Item>
              {/* {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="">
              Forgot password
            </a> */}
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                // onSubmit={this.handleSubmit}
              >
                Signup
              </Button>
              Or <Link to="/Login">Already registered?</Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Signup);

export default WrappedNormalLoginForm;
