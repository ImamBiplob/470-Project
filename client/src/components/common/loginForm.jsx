import React, { Component } from "react";
import Form from "./form";
import Joi, { errors } from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //call server
    const obj = this.state.data;

    try {
      const { data: jwt } = await axios.post(
        "http://localhost:3900/api/auth",
        obj
      );
      toast.success("successfully logged in :-)");
      console.log(jwt);
      localStorage.setItem("token", jwt);
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        errors.password = ex.response.data;
        toast.error("login failed! email or password is incorrect.");
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default (props) => <LoginForm history={useNavigate()} />;
