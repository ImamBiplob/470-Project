import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Ambulances extends Component {
  state = {
    ambulances: [],
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: ambulances } = await axios.get(
      "http://localhost:3900/api/ambulances"
    );
    this.setState({ ambulances });
  }

  getAmbulances() {
    const allAmbulances = this.state.ambulances;
    let filteredAmbulances = allAmbulances;

    if (this.state.searchQuery) {
      filteredAmbulances = allAmbulances.filter((d) =>
        d.type.toLowerCase().startsWith(this.state.searchQuery.toLowerCase())
      );
    }

    return filteredAmbulances;
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    if (this.state.ambulances.length === 0)
      return (
        <div className="text-bg-info p-3 shadow rounded">
          <h4 className="text">
            There are currently no ambulance available to request for service
          </h4>
        </div>
      );

    const ambulances = this.getAmbulances();

    return (
      <React.Fragment>
        <div className="text-bg-info p-3 shadow rounded">
          <h4 className="text">
            There are currently {this.state.ambulances.length} ambulances
            available to request for service
          </h4>
        </div>

        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
          label={"Search By Type..."}
        />

        <table className="table table-success table-striped shadow table-hover">
          <thead>
            <tr>
              <th>Ambulance Name</th>
              <th>Type</th>
              <th>Cost Per Hour</th>
              <th>Driver Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {ambulances.map((ambulance) => (
              <tr key={ambulance._id}>
                <td>{ambulance.name}</td>
                <td>{ambulance.type}</td>
                <td>{ambulance.cost_per_hour}</td>
                <td>
                  <Link to={`/drivers/${ambulance.driver._id}`}>
                    {ambulance.driver.name}
                  </Link>
                </td>
                <td>
                  {this.props.user && (
                    <Link to={`/ambulancerequest/${ambulance._id}`}>
                      <button className="btn btn-warning btn-sm">
                        Request For Service
                      </button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Ambulances;
