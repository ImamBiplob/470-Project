import React, { Component } from "react";
import { Link } from "react-router-dom";
import doctor from "./images/doctor.jpg";
import bloodbank from "./images/blood-bank1.jpg";
import ambulance from "./images/ambulance.jpg";
import seat from "./images/seat.jpg";
import medicine from "./images/medicine.jfif";
import Medicines from "./medicines";

const Home = () => {
  return (
    <React.Fragment>
      <div className="text-bg-info p-3 shadow my-2 rounded-2">
        <h2 className="home-title">
          All Your Medical Supports Are In One Place, Just A Few Clicks Away
        </h2>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>
              <div className="card shadow">
                <img src={doctor} className="card-img-top" alt="..." />

                <div className="card-body">
                  <h5 className="card-title">Appointment</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to={"/doctors"} className="btn btn-primary">
                    Click to View
                  </Link>
                </div>
              </div>
            </th>
            <th>
              <div className="card shadow">
                <img src={bloodbank} className="card-img-top" alt="..." />

                <div className="card-body">
                  <h5 className="card-title">Book Blood</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="/blood-banks" className="btn btn-primary">
                    Click to View
                  </Link>
                </div>
              </div>
            </th>
            <th>
              <div className="card shadow">
                <img src={ambulance} className="card-img-top" alt="..." />

                <div className="card-body">
                  <h5 className="card-title">Call Ambulance</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="/ambulances" className="btn btn-primary">
                    Click to View
                  </Link>
                </div>
              </div>
            </th>
            <th>
              <div className="card shadow">
                <img src={seat} className="card-img-top" alt="..." />

                <div className="card-body">
                  <h5 className="card-title">Book Seat</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="/seats" className="btn btn-primary">
                    Click to View
                  </Link>
                </div>
              </div>
            </th>
            <th>
              <div className="card shadow">
                <img src={medicine} className="card-img-top" alt="..." />

                <div className="card-body">
                  <h5 className="card-title">Order Medicine</h5>
                  <p className="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <Link to="/medicines" className="btn btn-primary">
                    Click to View
                  </Link>
                </div>
              </div>
            </th>
          </tr>
        </thead>
      </table>
    </React.Fragment>
  );
};

export default Home;
