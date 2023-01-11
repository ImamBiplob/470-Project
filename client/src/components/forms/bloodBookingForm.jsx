import React, { Component } from "react";
import Form from "../common/form";
import Joi, { errors } from "joi-browser";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";

export function withRouter(Children) {
  return (props) => {
    const match = { params: useParams() };
    return <Children {...props} match={match} />;
  };
}

class BloodBookingForm extends Form {
  state = {
    data: {
      reqstd_bg: "",
      reqstd_no_of_bags: "",
    },
    errors: {},
  };

  schema = {
    reqstd_bg: Joi.string()
      .min(2)
      .required()
      .label("Blood Group")
      .valid("A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"),
    reqstd_no_of_bags: Joi.number()
      .min(1)
      .max(20)
      .required()
      .label("Number of Bags"),
  };

  doSubmit = async () => {
    //call server
    const obj = {
      userId: jwtDecode(localStorage.getItem("token"))._id,
      blood_bankId: this.props.match.params.id,
      ...this.state.data,
    };
    console.log(obj);
    try {
      const response = await axios.post(
        "http://localhost:3900/api/blood-requests",
        obj
      );
      console.log(response);
      toast.success("booking request successful");
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
        toast.error("booking request failed!");
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Blood Booking Request</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("reqstd_bg", "Blood Group")}
          {this.renderInput("reqstd_no_of_bags", "Number of Bags")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default withRouter(BloodBookingForm);
