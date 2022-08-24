import React, { Component } from "react";
import axios from "axios";
import SearchBox from "./common/searchBox";

class Medicines extends Component {
  state = {
    medicines: [],
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: medicines } = await axios.get(
      "http://localhost:3900/api/medicines"
    );
    this.setState({ medicines });
  }

  getMedicines() {
    const allMedicines = this.state.medicines;
    let filteredMedicines = allMedicines;

    if (this.state.searchQuery) {
      filteredMedicines = allMedicines.filter((d) =>
        d.name.toLowerCase().startsWith(this.state.searchQuery.toLowerCase())
      );
    }

    return filteredMedicines;
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    if (this.state.medicines.length === 0)
      return (
        <h4 className="text">There are currently no medicine available</h4>
      );

    const medicines = this.getMedicines();

    return (
      <React.Fragment>
        <h4 className="text">
          There are currently {this.state.medicines.length} medicines available
        </h4>

        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
          label={"Search By Name..."}
        />

        <table className="table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((medicine) => (
              <tr key={medicine._id}>
                <td>{medicine.name}</td>
                <td>{medicine.price}</td>
                <td>{medicine.stock}</td>

                <td>
                  <button
                    onClick={this.makeAppointment}
                    className="btn btn-warning btn-sm"
                  >
                    Order for Medicine
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

export default Medicines;
