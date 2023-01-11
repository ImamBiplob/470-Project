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

class AmbulanceForm extends Form {
  state = {
    data: {
      location: "",
    },
    errors: {},
  };

  schema = {
    location: Joi.string().required().label("Location"),
  };

  doSubmit = async () => {
    //call server
    const obj = {
      userId: jwtDecode(localStorage.getItem("token"))._id,
      ambulanceId: this.props.match.params.id,
      ...this.state.data,
    };
    console.log(obj);
    try {
      const response = await axios.post(
        "http://localhost:3900/api/ambulance-requests",
        obj
      );
      console.log(response);
      toast.success("successfully submitted");
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
        toast.error("request failed!");
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Ambulance Request</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("location", "Location")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default withRouter(AmbulanceForm);
