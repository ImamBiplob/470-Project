import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Doctors extends Component {
  state = {
    doctors: [],
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: doctors } = await axios.get(
      "http://localhost:3900/api/doctors"
    );

    this.setState({ doctors });
  }

  getDoctors() {
    const allDoctors = this.state.doctors;
    let filteredDoctors = allDoctors;

    if (this.state.searchQuery) {
      filteredDoctors = allDoctors.filter((d) =>
        d.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
    }

    return filteredDoctors;
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    if (this.state.doctors.length === 0)
      return (
        <h4 className="text">
          There are currently no doctor available to make appointment
        </h4>
      );

    const doctors = this.getDoctors();

    return (
      <React.Fragment>
        <h4 className="text">
          There are currently {this.state.doctors.length} doctors available to
          make appointment
        </h4>

        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
          label={"Search By Name..."}
        />

        <table className="table">
          <thead>
            <tr>
              <th>Doctor's Name</th>
              <th>Email</th>
              <th>Sitting Time</th>
              <th>Qualifications</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>
                  <Link to={`/doctors/${doctor._id}`}>{doctor.name}</Link>
                </td>
                <td>{doctor.email}</td>
                <td>{doctor.sitting_time}</td>
                <td>{doctor.qualifications}</td>
                <td>
                  <button
                    onClick={this.makeAppointment}
                    className="btn btn-warning btn-sm"
                  >
                    Make Appointment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Doctors;
