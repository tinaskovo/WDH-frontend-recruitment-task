import React, { Component } from "react";
import LocationList from "./LocationList";

class LocationListContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageCount: 0,
      limit: 6,
      skip: 0,
      searching: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searching != this.state.searching) {
      this.updateState({ searching: nextProps.searching, page: 0, skip: 0 });
    }
  }

  updateState(state, cb) {
    this.setState(state, cb);
  }

  getLocationList() {
    let locationList = <LocationList data={this.getLocationListData()} />;

    return locationList;
  }

  getLocationListData() {
    let data = [];

    if (this.state.searching) {
      data = this.getPaginatedData(this.props.searchResults);
    } else {
      data = this.getPaginatedData(this.props.data);
    }

    return data;
  }

  getPaginatedData(data) {
    return data.slice(this.state.skip, this.state.skip + this.state.limit);
  }

  getPageCount() {
    if (this.state.searching) {
      return Math.ceil(this.props.searchResults.length / this.state.limit);
    } else {
      return Math.ceil(this.props.data.length / this.state.limit);
    }
  }

  getNavigation() {
    const disabled = this.state.page === 0;
    let navigation = !disabled ? (
      <div className="wrapper">
        <button onClick={this.onPageDecrement.bind(this)}>Previous</button>
        <button onClick={this.onPageIncrement.bind(this)}>Next</button>
      </div>
    ) : (
      <div className="wrapper">
        <button onClick={this.onPageIncrement.bind(this)}>Next</button>
      </div>
    );
    return navigation;
  }

  onPageDecrement() {
    if (this.state.page > 0) {
      let page = this.state.page - 1;
      let skip = this.state.skip;
      skip -= this.state.limit;

      this.updateState({ page: page, skip: skip });
    }
  }

  onPageIncrement() {
    if (this.state.page < this.getPageCount()) {
      let page = this.state.page + 1;
      let skip = this.state.skip;
      skip += this.state.limit;

      this.updateState({ page: page, skip: skip });
    }
  }

  render() {
    return (
      <div id="location-list-container">
        <div className="list-items">{this.getLocationList()}</div>

        <div className="navigation">
          {this.getNavigation()}
          <p>
            {" "}
            Showing page {this.state.page + 1} of {this.getPageCount()}{" "}
          </p>
        </div>
      </div>
    );
  }
}

export default LocationListContainer;
