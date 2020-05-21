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
import { modifyResult, filterArr } from "../../helper.js";
import options from "./optionsData.js";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "Select a Plant and Click on Search",
      term: "",
      placeholder: "Ex: Rose, Palm, California, etc.",
      results: [],
      latin_name: "",
      bloomTime: "",
      plantType: "",
      waterNeeds: "",
      sizeAtMaturity: "",
      suitableSiteConditions: "",
      appropriateLocation: "",
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
            //  this.props.changeFetchedResults(this.state.results);
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
      </>
    );
  }

  handleButtonClick = () => {
    const query = this.queryGenerator(this.state.term);

    //fetch response from DataSF and update state
    if (this.state.term) {
      this.setState({ searchButtonTerm: "Loading..." });
      fetch(query)
        .then(response => response.json())
        .then(response => {
          console.log("response is here");
          console.log("response is here");

          console.log("response is here");
          console.log(response);

          this.setState({
            results: [...response, ...this.state.results]
          });
          if (response.length) {
            this.showClear();
            this.setState({ classTable: "showButton" });
            this.setState({ searchButtonTerm: "Search" });
          } else {
            this.setState({ searchButtonTerm: "Search" });

            window.alert("Sorry, item details are not available");
            this.setState({ classTable: "showButton" });
          }

          const filteredResults = filterArr(this.state.results);
          this.setState({
            results: filteredResults
          });
          this.props.changeFetchedResults(this.state.results);
        })
        .catch(err => {
          window.alert("Sorry, item details are not available");
        })
        .finally(() => {
          this.setState({ heading: "Select Another Plant to Search" });
          this.forceUpdate();
          this.setState({ placeholder: "Ex: Rose, Palm, California, etc." });
          this.setState({ searchButtonTerm: "Search" });
        });
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
    let emptyArray = [];
    this.setState({ results: emptyArray });
    this.props.changeFetchedResults(emptyArray);
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
    console.log(query);
    return query;
  };
  1;

  handleAdvancedFilterClick = () => {
    if (this.state.filterShow) {
      this.setState({ filterClass: "hideButton" });
    } else {
      this.setState({ filterClass: "showButton" });
    }
  };
}
export default SearchBar;
