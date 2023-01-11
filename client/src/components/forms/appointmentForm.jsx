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

class AppointmentForm extends Form {
  state = {
    data: {
      patient_name: "",
      patient_sex: "",
      patient_age: "",
      appointment_date: "",
    },
    errors: {},
  };

  schema = {
    patient_name: Joi.string().min(3).max(255).required().label("Patient Name"),
    patient_sex: Joi.string().valid("Male", "Female").label("Patient Sex"),
    patient_age: Joi.number().min(0).max(200).label("Patient Age"),
    appointment_date: Joi.string().required(),
  };

  doSubmit = async () => {
    //call server
    const obj = {
      userId: jwtDecode(localStorage.getItem("token"))._id,
      doctorId: this.props.match.params.id,
      ...this.state.data,
    };
    console.log(obj);
    try {
      const response = await axios.post(
        "http://localhost:3900/api/appointments",
        obj
      );
      console.log(response);
      toast.success("successfully submitted:-)");
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
        toast.error("failed to make appointment!");
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Make Appointment</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("patient_name", "Patient's Name")}
          {this.renderInput("patient_sex", "Sex")}
          {this.renderInput("patient_age", "Age")}
          {this.renderInput("appointment_date", "Appointment Date")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default withRouter(AppointmentForm);
