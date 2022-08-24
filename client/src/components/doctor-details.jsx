import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DoctorProfile() {
  let params = useParams();
  let [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (doctor && doctor.id === params.id) {
      return;
    }
    getDoctorDetails();
  });

  function getDoctorDetails() {
    axios
      .get("http://localhost:3900/api/doctors/" + params.id)
      .then((response) => {
        setDoctor({ ...response.data, id: params.id });
      });
  }

  if (doctor) {
    return (
      <React.Fragment>
        <table className="table">
          <h4 className="text">Doctor's Profile</h4>
          <tr>
            <th>Doctor's ID:- {doctor.id}</th>
          </tr>
          <tr>
            <th>Doctor's Name:- {doctor.name}</th>
          </tr>
          <tr>
            <th>Doctor's Email:- {doctor.email}</th>
          </tr>
          <tr>
            <th>Sitting Time:- {doctor.sitting_time}</th>
          </tr>
          <tr>
            <th>Qualifications:- {doctor.qualifications}</th>
          </tr>
          <tr>
            <th>Availability:- {doctor.availability}</th>
          </tr>
        </table>
      </React.Fragment>
    );
  }

  return null;
}
