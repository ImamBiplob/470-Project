import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
        <div className="text-bg-info p-3 shadow rounded">
          <h4 className="text">There are currently no medicine available</h4>
        </div>
      );

    const medicines = this.getMedicines();

    return (
      <React.Fragment>
        <div className="text-bg-info p-3 shadow rounded">
          <h4 className="text">
            There are currently {this.state.medicines.length} medicines
            available
          </h4>
        </div>

        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
          label={"Search By Name..."}
        />

        <table className="table table-success table-striped shadow table-hover">
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
                  {this.props.user && (
                    <Link to={`/medicineorder/${medicine._id}`}>
                      <button className="btn btn-warning btn-sm">
                        Order for Medicine
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

export default Medicines;
