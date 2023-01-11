import React, { Component } from "react";
import axios from "axios";

class UserProfile extends Component {
  state = { user: {} };

  async componentDidMount() {
    const id = this.props.user._id;
    const response = await axios.get("http://localhost:3900/api/users/" + id);
    const user = response.data;
    this.setState({ user });
  }
  render() {
    return (
      <React.Fragment>
        <div className="text-bg-info p-3">
          <h4 className="text">User Profile</h4>
        </div>
        <p className="text">User Name: {this.state.user.name}</p>
        <p className="text">Email: {this.state.user.email}</p>
        <p className="text">Blood Group: {this.state.user.blood_group}</p>
        <p className="text">Phone: {this.state.user.phone}</p>
        <p className="text">Address: {this.state.user.address}</p>
      </React.Fragment>
    );
  }
}

export default UserProfile;
