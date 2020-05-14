import React, { Component } from "react";
import style from "./SearchBar.css";
import {
  Row,
  Col,
  Button,
  Container,
  Table,
  Display4
} from "bootstrap-4-react";
import Select from "react-select";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "Select a Plant and Click on Search",
      term: "",
      placeholder: "Ex: Rose, Palm, California, etc.",
      results: [],
      latin_name: "",
      bloom_time: "",
      plant_type: "",
      water_needs: "",
      size_at_maturity: "",
      suitable_site_conditions: "",
      appropriate_location: "",
      classN: "hideButton",
      classTable: "hideButton",
      searchButtonTerm: "Search",
      advancedFilterTerm: "More Filters",
      value: "",
      selectedOption: null,
      addBtnVariant: "primary",
      addBtnClass: "btn-primary"
    };
  }

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    this.setState({ term: selectedOption.label });
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <>
        <Row className="pt-2">
          <Display4>{this.state.heading}</Display4>
        </Row>
        <Row>
          <Col>
            <Select
              value={selectedOption}
              onChange={this.handleSelectChange}
              options={options}
              className="selectClass"
            />
          </Col>
        </Row>
        <br></br>
        <Button
          variant="primary"
          className="btn-primary default-button"
          type="button"
          onSubmit={() => {
            this.handleButtonClick();
          }}
          onClick={() => {
            this.handleButtonClick();
          }}
        >
          {this.state.searchButtonTerm}
        </Button>
        <Button
          variant="primary"
          className={`btn-primary default-button ${this.state.classN}`}
          onClick={() => {
            this.handleClearButtonClick();
          }}
        >
          Clear Results
        </Button>
        <p className={`${this.state.classTable} mt-3 pb-0 mb-0`}>
          <em>
            {" "}
            Search results are being pulled from{" "}
            <a href="http://www.datasf.org" target="_blank">
              {" "}
              www.DataSF.org
            </a>
          </em>
        </p>
        <Table
          className={`table-primary-1 ${this.state.classTable} mt-1`}
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>Action</th>
              <th className="head-1">Name</th>
              <th>Bloom Time</th>
              <th>Plant Type</th>
              <th>Water Needs</th>
              <th>Size at Maturity</th>
              <th>Appropriate Location</th>
              <th>Suitable Site Conditions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.results.map(result => {
              console.log(result);
              // result.common_name = result["common_name"].replace(";", ", ");
              // result.bloom_time = result["bloom_time"].replace(";", ", ");
              // result.plant_type = result["plant_type"].replace(";", ", ");
              var common_name = result.common_name || "-";
              common_name = common_name.replace(/;/g, ", ");

              var bloom_time = result.bloom_time || "-";
              bloom_time = bloom_time.replace(/;/g, ", ");

              var plant_type = result.plant_type || "-";
              plant_type = plant_type.replace(/;/g, ", ");

              var water_needs = result.water_needs || "-";
              water_needs = water_needs.replace(/;/g, ", ");

              var size_at_maturity = result.size_at_maturity || "-";
              size_at_maturity = size_at_maturity.replace(/;/g, ", ");

              var appropriate_location = result.appropriate_location || "-";
              appropriate_location = appropriate_location.replace(/;/g, ", ");

              var suitable_site_conditions =
                modifiedResult.suitable_site_conditions || "-";
              return (
                <>
                  <tr>
                    <td
                      onClick={() => {
                        this.handleAdd(result);
                      }}
                    >
                      Add
                    </td>
                    <td>{common_name} </td>
                    <td>{bloom_time} </td>
                    <td>{plant_type} </td>
                    <td>{water_needs} </td>
                    <td>{size_at_maturity} </td>
                    <td>{appropriate_location} </td>
                    <td>{suitable_site_conditions} </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>

        {/* {this.state.results.map(result => {
          return (
            <>
              <Row>
                <Col>{result.common_name}</Col>
                <Col>{result.appropriate_location}</Col>
                <Col>{result.bloom_time}</Col>
                <Col> {result.plant_type}</Col>
              </Row>
            </>
          );
        })} */}
      </>
    );
  }

  handleAdd = result => {
    this.props.changeAddItem(result);
  };

  handleButtonClick = () => {
    const query = this.queryGenerator(this.state.term);

    //fetch response from DataSF and update state
    if (this.state.term) {
      this.setState({ searchButtonTerm: "Loading..." });
      fetch(query)
        .then(response => response.json())
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            this.setState({
              results: [response[i], ...this.state.results]
            });
            if (response.length) {
              this.showClear();
              this.setState({ classTable: "showButton" });
              this.setState({ searchButtonTerm: "Search" });
            }
          }
        });
      this.setState({ heading: "Select Another Plant to Search" });
      this.forceUpdate();
      this.setState({ placeholder: "Ex: Rose, Palm, California, etc." });
    } else {
      window.alert("Please enter a search term");
    }
  };

  addLower = term => {
    return term.charAt(0).toLowerCase() + this.state.term.slice(1);
  };

  addUpper = term => {
    return term.charAt(0).toUpperCase() + this.state.term.slice(1);
  };

  handleClearButtonClick = () => {
    this.setState({
      results: [],
      classN: "hideButton"
    });
    this.setState({ classTable: "hideButton" });
  };

  showClear = () => {
    this.setState({ classN: "showButton" });
  };

  onInputChange(term) {
    this.setState({ term });
  }

  queryGenerator = () => {
    //Get value from search box and curate the query
    var term2 = "";
    if (this.state.term.charAt(0) === this.state.term.charAt(0).toUpperCase()) {
      term2 = this.addLower(this.state.term);
    } else {
      term2 = this.addUpper(this.state.term);
    }
    const query = `https://data.sfgov.org/resource/vmnk-skih.json?$where=common_name%20like%20%27%25${this.state.term}%25%27%20OR%20common_name%20like%20%27%25${term2}%25%27`;
    return query;
  };

  handleAdvancedFilterClick = () => {
    if (this.state.filterShow) {
      this.setState({ filterClass: "hideButton" });
    } else {
      this.setState({ filterClass: "showButton" });
    }
  };

  searchQuery(term) {}
}
export default SearchBar;
