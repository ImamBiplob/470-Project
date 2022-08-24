import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function DriverProfile() {
  let params = useParams();
  let [driver, setDriver] = useState(null);

  useEffect(() => {
    if (driver && driver.id === params.id) {
      return;
    }
    getDriverDetails();
  });

  function getDriverDetails() {
    axios
      .get("http://localhost:3900/api/drivers/" + params.id)
      .then((response) => {
        setDriver({ ...response.data, id: params.id });
      });
  }

  if (driver) {
    return (
      <React.Fragment>
        <table className="table">
          <h4 className="text">Driver's Profile</h4>
          <tr>
            <td>Driver's ID:- {driver.id}</td>
          </tr>
          <tr>
            <td>Driver's Name:- {driver.name}</td>
          </tr>
          <tr>
            <td>Driver's Phone:- {driver.phone}</td>
          </tr>
        </table>
      </React.Fragment>
    );
  }

  return null;
}
