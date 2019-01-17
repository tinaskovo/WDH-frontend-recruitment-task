import React, { Component } from "react";

class LocationList extends Component {
  constructor(props) {
    super(props);
  }

  isEmpty() {
    return this.props.data.length === 0;
  }

  getList() {
    let result;

    if (this.isEmpty()) {
      result = (
        <div className="wrapper">
          <p>No locations found.</p>
        </div>
      );
    } else {
      result = (
        <div className="wrapper">
          {this.props.data.map(location => (
            <div className="location-list-item" key={location.Id}>
              <p>{location.Name}</p>
              <p>{location.FormattedAddress}</p>
            </div>
          ))}
        </div>
      );
    }

    return result;
  }

  render() {
    return <div id="location-list">{this.getList()}</div>;
  }
}

export default LocationList;
