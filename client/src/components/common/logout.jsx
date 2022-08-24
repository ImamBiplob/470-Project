import React, { Component } from "react";
import { toast } from "react-toastify";

class Logout extends Component {
  componentDidMount() {
    localStorage.removeItem("token");
    toast("successfully logged out");
    setTimeout(() => {
      window.location = "/";
    }, 1000);
  }

  render() {
    return null;
  }
}

export default Logout;
