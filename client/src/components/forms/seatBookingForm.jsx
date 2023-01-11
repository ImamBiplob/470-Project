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

class SeatBookingForm extends Form {
  state = {
    data: {
      patient_name: "",
      patient_disease: "",
      patient_age: "",
      patient_sex: "",
    },
    errors: {},
  };

  schema = {
    patient_name: Joi.string().min(2).max(255).required().label("Patient Name"),
    patient_disease: Joi.string().label("Patient Disease"),
    patient_age: Joi.number().label("Age"),
    patient_sex: Joi.string().valid("Male", "Female").label("Sex"),
  };

  doSubmit = async () => {
    //call server
    const obj = {
      userId: jwtDecode(localStorage.getItem("token"))._id,
      seatId: this.props.match.params.id,
      ...this.state.data,
    };
    console.log(obj);
    try {
      const response = await axios.post(
        "http://localhost:3900/api/seat-bookings",
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
        <h1>Seat Booking Request</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("patient_name", "Patient Name")}
          {this.renderInput("patient_disease", "Patient Disease")}
          {this.renderInput("patient_sex", "Sex")}
          {this.renderInput("patient_age", "Age")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default withRouter(SeatBookingForm);
