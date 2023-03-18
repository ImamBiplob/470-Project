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
        <div className="text-bg-info p-3 shadow my-2 rounded">
          <h4 className="text">Doctor's Profile</h4>
        </div>

        <p>Doctor's ID:- {doctor.id}</p>

        <p>Doctor's Name:- {doctor.name}</p>

        <p>Doctor's Email:- {doctor.email}</p>

        <p>Sitting Time:- {doctor.sitting_time}</p>

        <p>Qualifications:- {doctor.qualifications}</p>
      </React.Fragment>
    );
  }

  return null;
}
