import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import NavBar from "./components/navbar";
import SideBar from "./components/sidebar";
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
import AppointmentForm from "./components/forms/appointmentForm";
import AmbulanceForm from "./components/forms/ambulanceForm";
import BloodBookingForm from "./components/forms/bloodBookingForm";
import SeatBookingForm from "./components/forms/seatBookingForm";
import MedicineOrderForm from "./components/forms/medicineForm";
import Logout from "./components/common/logout";
import Footer from "./components/footer";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import UserProfile from "./components/user-profile";

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
      <div className="bg-info bg-gradient">
        <ToastContainer />
        <NavBar user={this.state.user} />
        <SideBar user={this.state.user} />
        <main className="container min-vh-100">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navigate" element={<Navigate to="/" />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/user-profile"
              element={<UserProfile user={this.state.user} />}
            />
            <Route
              path="/doctors"
              element={<Doctors user={this.state.user} />}
            />
            <Route path="/appointment/:id" element={<AppointmentForm />} />
            <Route path="/doctors/:id" element={<DoctorProfile />} />
            <Route
              path="/ambulances/"
              element={<Ambulances user={this.state.user} />}
            />
            <Route path="/ambulancerequest/:id" element={<AmbulanceForm />} />
            <Route path="/drivers/:id" element={<DriverProfile />} />
            <Route
              path="/blood-banks/"
              element={<BloodBanks user={this.state.user} />}
            />
            <Route path="/bloodrequest/:id" element={<BloodBookingForm />} />
            <Route path="/seats/" element={<Seats user={this.state.user} />} />
            <Route path="/seatbooking/:id" element={<SeatBookingForm />} />
            <Route
              path="/medicines/"
              element={<Medicines user={this.state.user} />}
            />
            <Route path="/medicineorder/:id" element={<MedicineOrderForm />} />
          </Routes>
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
