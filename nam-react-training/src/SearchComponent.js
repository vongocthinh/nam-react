import React, { Component } from "react";

class Search extends Component {
  handleOnClick = () => {
    this.props.Search();
    this.props.Pagination();
  };
  render() {
    return (
      <div className="container-fluid">
        <div style={{ display: "flex" }}>
          <input
            id="SearchName"
            type="text"
            className="form-control "
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />

          <button
            type="button"
            style={{ width: "30%" }}
            className="btn btn-outline-primary "
            onClick={this.handleOnClick}
          >
            Search
          </button>
        </div>
        <hr />
      </div>
    );
  }
}

export default Search;
