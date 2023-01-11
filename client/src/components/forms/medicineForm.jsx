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

class MedicineOrderForm extends Form {
  state = {
    data: {
      reqstd_no_of_medicine: "",
      location: "",
    },
    errors: {},
  };

  schema = {
    reqstd_no_of_medicine: Joi.number().label("Number of Medicine").required(),
    location: Joi.string().label("Location").required(),
  };

  doSubmit = async () => {
    //call server
    const obj = {
      userId: jwtDecode(localStorage.getItem("token"))._id,
      medicineId: this.props.match.params.id,
      ...this.state.data,
    };
    console.log(obj);
    try {
      const response = await axios.post(
        "http://localhost:3900/api/medicine-orders",
        obj
      );
      console.log(response);
      toast.success("order successful");
      setTimeout(() => {
        window.location = "/";
      }, 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        this.setState({ errors });
        toast.error("order failed!");
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Medicine Order</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("reqstd_no_of_medicine", "Number of Medicine")}
          {this.renderInput("location", "Location")}
          {this.renderButton("Submit")}
        </form>
      </div>
    );
  }
}

export default withRouter(MedicineOrderForm);
