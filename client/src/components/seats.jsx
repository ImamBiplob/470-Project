import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Seats extends Component {
  state = {
    seats: [],
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: seats } = await axios.get("http://localhost:3900/api/seats");
    this.setState({ seats });
  }

  getSeats() {
    const allSeats = this.state.seats;
    let filteredSeats = allSeats;

    if (this.state.searchQuery) {
      filteredSeats = allSeats.filter((d) =>
        d.type.toLowerCase().includes(this.state.searchQuery.toLowerCase())
      );
    }

    return filteredSeats;
  }

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    if (this.state.seats.length === 0)
      return (
        <div className="text-bg-info p-3">
          <h4 className="text">There are currently no seat available</h4>
        </div>
      );

    const seats = this.getSeats();

    return (
      <React.Fragment>
        <div className="text-bg-info p-3">
          <h4 className="text">
            There are currently {this.state.seats.length} seats available
          </h4>
        </div>

        <SearchBox
          value={this.state.searchQuery}
          onChange={this.handleSearch}
          label={"Search By Type..."}
        />

        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th>Seat's Number</th>
              <th>Type of Seat</th>
              <th>Cost</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {seats.map((seat) => (
              <tr key={seat._id}>
                <td>{seat.seat_no}</td>
                <td>{seat.type}</td>
                <td>{seat.cost}</td>

                <td>
                  {this.props.user && (
                    <Link to={`/seatbooking/${seat._id}`}>
                      <button className="btn btn-warning btn-sm">
                        Request for Booking Seat
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

export default Seats;
