import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navbar";
import Doctors from "./components/doctors";
import DoctorProfile from "./components/doctor-details";
import Ambulances from "./components/ambulances";
import DriverProfile from "./components/driver-details";
import BloodBanks from "./components/blood-banks";
import Seats from "./components/seats";
import Medicines from "./components/medicines";
import Home from "./components/home";
import RegisterForm from "./components/common/registerForm";
import LoginForm from "./components/common/loginForm";
import Logout from "./components/common/logout";
import Footer from "./components/footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      console.log(user);
      this.setState({ user });
    } catch (error) {}
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navigate" element={<Navigate to="/" />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route path="/ambulances/" element={<Ambulances />} />
            <Route path="/drivers/:id" element={<DriverProfile />} />
            <Route path="/blood-banks/" element={<BloodBanks />} />
            <Route path="/seats/" element={<Seats />} />
            <Route path="/medicines/" element={<Medicines />} />
          </Routes>
        </main>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
