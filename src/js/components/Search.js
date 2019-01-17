import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);
  }

  onSearch(e) {
    this.props.onSearch(e.target.value);
  }

  render() {
    return (
      <div id="search">
        <input type="text" onChange={this.onSearch.bind(this)} />
      </div>
    );
  }
}

export default Search;
