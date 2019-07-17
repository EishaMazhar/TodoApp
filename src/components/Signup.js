import React, { Component } from "react";
import axios from "axios";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    age: "",
    password: "",
    password2: "",
    validatep2: false
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };
  onFChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onPassword2Change = event => {
    this.setState({ [event.target.name]: event.target.value });
    if (this.state.password !== event.target.value) {
      this.setState({ validatep2: "false" });
    } else {
      this.setState({ validatep2: "true" });
    }
  };
  // Submitdata = event => {
  //   event.preventDefault();
  //   const obj = {
  //     firstname: this.state.firstname,
  //     lastname: this.state.lastname,
  //     username: this.state.username,
  //     email: this.state.email,
  //     age: this.state.age,
  //     password: this.state.password
  //   };
  //   if (this.state.validatep2 === "true") {
  //     axios
  //       .post(`${API_URL}${SIGNUP}`, obj)
  //       .then(
  //         val => console.log(val)
  //         // <Result
  //         //   icon={<Icon type="smile" theme="twoTone" />}
  //         //   title="Great, we have done all the operations!"
  //         //   extra={<Button type="primary">Next</Button>}
  //         // />
  //         // this.setState({
  //         //   firstname: "",
  //         //   lastname: "",
  //         //   username: "",
  //         //   email: "",
  //         //   age: "",
  //         //   password: "",
  //         //   password2: ""
  //         // })
  //       )
  //       .catch(err => console.log(err));
  //   }
  // };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <nav className="NavBar">
          <ul>
            <li className="Logo">TODO APP</li>
          </ul>
        </nav>
        <Form
          onSubmit={this.handleSubmit}
          className="Signup-form"
          layout="vertical"
          style={{ width: "50%", margin: "0 auto", height: "130px" }}
        >
          <h1>USER SIGNUP</h1>
          <Form.Item>
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
              />
            )}
          </Form.Item>
          <Form.Item>
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
              />
            )}
          </Form.Item>
          <Form.Item>
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
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your E-mail!" }]
            })(
              <Input
                type="email"
                prefix={
                  <Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="E-mail"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("age", {
              rules: [{ required: true, message: "Please input your Age!" }]
            })(
              <Input
                type="number"
                prefix={
                  <Icon type="count" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Age"
              />
            )}
          </Form.Item>
          <Form.Item>
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
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please confirm your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Confirm Password"
              />
            )}
          </Form.Item>
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
            >
              Signup
            </Button>
            Or <Link to="/Login">Already registered?</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
const WrappedNormalLoginForm = Form.create({ name: "normal_login" })(Signup);

export default WrappedNormalLoginForm;
