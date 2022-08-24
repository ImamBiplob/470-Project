import React, { Component } from "react";
import Form from "./form";
import Joi, { errors } from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

class RegisterForm extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
      phone: "",
      blood_group: "",
      address: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().email().min(5).max(255).required().label("Email"),
    password: Joi.string().min(5).max(255).required().label("Password"),
    name: Joi.string().min(3).max(255).required().label("Name"),
    phone: Joi.string().min(8).max(15).label("Phone"),
    blood_group: Joi.string()
      .min(2)
      .valid("A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-")
      .label("Blood Group"),
    address: Joi.string().label("Address"),
  };

  doSubmit = async () => {
    //call server
    const obj = this.state.data;
    try {
      const response = await axios.post("http://localhost:3900/api/users", obj);
      console.log(response);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      toast.success("successfully registered :-)");
      this.props.history("/");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
        toast.error("failed to register!");
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register Here</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("blood_group", "Blood Group")}
          {this.renderInput("address", "Address")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default (props) => <RegisterForm history={useNavigate()} />;
