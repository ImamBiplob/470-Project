import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class BloodBanks extends Component {
  state = {
    blood_banks: [],
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: blood_banks } = await axios.get(
      "http://localhost:3900/api/blood-banks"
    );
    this.setState({ blood_banks });
  }

  getBloodBanks() {
    const allBanks = this.state.blood_banks;
    let filteredBanks = allBanks;

    if (this.state.searchQuery) {
      filteredBanks = allBanks.filter((b) =>
        b.blood_group
          .toLowerCase()
          .startsWith(this.state.searchQuery.toLowerCase())
      );
    }

    return filteredBanks;
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    if (this.state.blood_banks.length === 0)
      return (
        <div className="text-bg-info p-3">
          <h4 className="text">There are currently no blood-bank available</h4>
        </div>
      );

    const blood_banks = this.getBloodBanks();

    return (
      <React.Fragment>
        <div className="text-bg-info p-3">
          <h4 className="text">
            There are currently {this.state.blood_banks.length} blood-banks
            available
          </h4>
        </div>

        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
          label={"Search By Blood Group..."}
        />

        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th>Blood-Bank's ID</th>
              <th>Blood Group</th>
              <th>Available Bags</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {blood_banks.map((blood_bank) => (
              <tr key={blood_bank._id}>
                <td>{blood_bank._id}</td>
                <td>{blood_bank.blood_group}</td>
                <td>{blood_bank.no_of_bags}</td>

                <td>
                  {this.props.user && (
                    <Link to={`/bloodrequest/${blood_bank._id}`}>
                      <button className="btn btn-warning btn-sm">
                        Request for Booking Blood
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

export default BloodBanks;
