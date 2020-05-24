import React, { Component } from "react";
import style from "./SearchBar.css";
import { Row, Col, Button, Display4, BDiv } from "bootstrap-4-react";
import Select from "react-select";
import { modifyResult, filterArr } from "../../helper.js";
import options from "./optionsData.js";
import whereOptions, {
  bloomConditions,
  bloomValues,
  locationConditions,
  locationValues,
  nameConditions,
  nameValues,
  sizeConditions,
  sizeValues,
  waterConditions,
  waterValues,
  siteConditions,
  siteValues,
  typeConditions,
  typeValues
} from "./selectOptions";
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
      addBtnClass: "btn-primary",
      showCondition: null,
      showValue: null,
      conditionOptions: [],
      valueOptions: [],
      selectedConditionOption: [],
      selectedValueOption: [],
      selectedWhereOption: []
    };
  }

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    this.setState({ term: selectedOption.label });
  };

  handleWhereChange = (index, option) => {
    let conditionValues;
    let valueValues;
    if (
      this.state.selectedWhereOption[index] &&
      this.state.selectedWhereOption[index].label !== option.label
    ) {
      let selectedConditionOption = [...this.state.selectedConditionOption];
      let selectedValueOption = [...this.state.selectedValueOption];

      selectedConditionOption[index] = null;
      selectedValueOption[index] = null;

      this.setState({
        selectedConditionOption: [...selectedConditionOption],
        selectedValueOption: [...selectedValueOption]
      });
    }
    let selectedWhereOption = [...this.state.selectedWhereOption];
    selectedWhereOption[index] = option;

    this.setState({ selectedWhereOption: selectedWhereOption });
    //if(option.value !== this.state.selectedWhereOption[index])
    switch (option.label) {
      case "Name":
        conditionValues = nameConditions;
        valueValues = nameValues;
        break;
      case "Bloom Time":
        conditionValues = bloomConditions;
        valueValues = bloomValues;
        break;
      case "Plant Type":
        conditionValues = typeConditions;
        valueValues = typeValues;
        break;
      case "Water Needs":
        conditionValues = waterConditions;
        valueValues = waterValues;
        break;
      case "Size at Maturity":
        conditionValues = sizeConditions;
        valueValues = sizeValues;
        break;
      case "Appropriate Location":
        conditionValues = locationConditions;
        valueValues = locationValues;
        break;
      case "Suitable Site Conditions":
        conditionValues = siteConditions;
        valueValues = siteValues;
        break;

      default:
        break;
    }
    let conditionState = [...this.state.conditionOptions];
    let conditionValue = [...this.state.valueOptions];
    let selectedConditionOption = [...this.state.selectedConditionOption];
    let selectedValueOption = [...this.state.selectedValueOption];

    conditionState[index] = conditionValues;
    conditionValue[index] = valueValues;

    // selectedConditionOption[index] = null;
    // selectedValueOption[index] = null;

    this.setState(
      {
        showCondition: true,
        conditionOptions: conditionState,
        valueOptions: conditionValue
      },
      () => {}
    );
  };

  handleConditionChange = (index, option) => {
    let tempSelectedConditionOption = [...this.state.selectedConditionOption];
    tempSelectedConditionOption[index] = option;
    this.setState({
      showValue: true,
      selectedConditionOption: [...tempSelectedConditionOption]
    });
  };

  handleValueChange = (index, option) => {
    let tempSelectedValueOption = [...this.state.selectedValueOption];
    tempSelectedValueOption[index] = option;

    this.setState({
      selectedValueOption: [...tempSelectedValueOption]
    });
  };
  render() {
    const { selectedOption, showCondition, showValue } = this.state;
    const filterNumbers = 1;
    const selectConditionStyle = {
      width: "250px"
    };
    const selectWhereStyle = {
      width: "250px"
    };
    const selectedConditionOption = [...this.state.selectedConditionOption];
    const selectedValueOption = [...this.state.selectedValueOption];

    return (
      <>
        <Display4 className="width-check">
          Create a Query and Click on Search
        </Display4>

        {[...Array(filterNumbers)].map((e, index) => {
          // console.log(selectedConditionOption[index]);
          // console.log(this.state.selectedOption);
          return (
            <>
              {/* <React.Fragment>
                <BDiv display="flex" flex="row" mb="3">
                  <BDiv p="3" style={selectWhereStyle}>
                    <p>Step 1: Select Attribute</p>
                    <Select
                      // value={selectWhere}
                      onChange={this.handleWhereChange.bind(this, index)}
                      options={whereOptions}
                      className="pr-1"
                      display="inline"
                      placeholder="where"
                      style={selectWhereStyle}
                    />
                  </BDiv>

                  {showCondition && (
                    <BDiv p="3" style={selectConditionStyle}>
                      <p>Step 2: Select Condition</p>
                      <Select
                        // value={selectCondition}
                        onChange={this.handleConditionChange.bind(this, index)}
                        options={this.state.conditionOptions[index]}
                        className="pr-1"
                        display="inline"
                        style={selectConditionStyle}
                        value={selectedConditionOption[index]}
                      />
                    </BDiv>
                  )}

                  {showValue && (
                    <BDiv p="3" style={selectConditionStyle}>
                      <p>Step 3: Select Value</p>

                      <Select
                        // value={selectProperty}
                        onChange={this.handleValueChange.bind(this, index)}
                        options={this.state.valueOptions[index]}
                        className="selectClass pr-1"
                        display="inline"
                        value={selectedValueOption[index]}
                      />
                    </BDiv>
                  )}
                </BDiv>
                <Button
                  variant="primary"
                  className="btn-primary default-button"
                  type="button"
                  onSubmit={() => {
                    this.handleAdButtonClick(index);
                  }}
                  onClick={() => {
                    this.handleAdButtonClick(index);
                    //  this.props.changeFetchedResults(this.state.results);
                  }}
                >
                  Search
                </Button>
              </React.Fragment> */}
              <React.Fragment>
                <Row>
                  <Col col="col-9 md-4">
                    <p className="mb-1 mt-2">Step 1: Select Attribute</p>
                    <Select
                      // value={selectWhere}
                      onChange={this.handleWhereChange.bind(this, index)}
                      options={whereOptions}
                      className="pr-1"
                      display="inline"
                      placeholder="where"
                      style={selectWhereStyle}
                    />
                  </Col>
                  <Col col="col-9 md-4 ">
                    <p className="mb-1 mt-2">Step 2: Select Condition</p>
                    <Select
                      // value={selectCondition}
                      onChange={this.handleConditionChange.bind(this, index)}
                      options={this.state.conditionOptions[index]}
                      className="pr-1"
                      display="inline"
                      style={selectConditionStyle}
                      value={selectedConditionOption[index]}
                    />
                  </Col>
                  <Col col="col-9 md-4">
                    <p className="mb-1 mt-2">Step 3: Select Value</p>

                    <Select
                      // value={selectProperty}
                      onChange={this.handleValueChange.bind(this, index)}
                      options={this.state.valueOptions[index]}
                      className=" pr-1"
                      display="inline"
                      value={selectedValueOption[index]}
                      style={selectConditionStyle}
                    />
                  </Col>
                  <Col col="col-12">
                    <Button
                      variant="primary"
                      className="btn-primary default-button mt-4"
                      type="button"
                      onSubmit={() => {
                        this.handleAdButtonClick(index);
                      }}
                      onClick={() => {
                        this.handleAdButtonClick(index);
                        //  this.props.changeFetchedResults(this.state.results);
                      }}
                    >
                      Search
                    </Button>
                  </Col>
                </Row>
              </React.Fragment>
            </>
          );
        })}

        {/* <Display4 className="width-check">{this.state.heading}</Display4>
        <Row>
          <Col>
            <Select
              value={selectedOption}
              onChange={this.handleSelectChange}
              options={options}
              className="selectClass pr-1"
              display="inline"
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
        </Button> */}
      </>
    );
  }

  handleAdButtonClick = index => {
    console.log(index);

    if (
      this.state.selectedWhereOption &&
      this.state.selectedWhereOption[index] &&
      this.state.selectedConditionOption &&
      this.state.selectedConditionOption[index] &&
      this.state.selectedValueOption &&
      this.state.selectedValueOption[index]
    ) {
      const query = this.adQueryGenerator(index);
      fetch(query)
        .then(response => response.json())
        .then(response => {
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
      window.alert("Please complete all steps");
    }
  };
  handleButtonClick = () => {
    const query = this.queryGenerator(this.state.term);

    //fetch response from DataSF and update state
    if (this.state.term) {
      this.setState({ searchButtonTerm: "Loading..." });
      fetch(query)
        .then(response => response.json())
        .then(response => {
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
    return term.charAt(0).toLowerCase() + term.slice(1);
  };

  addUpper = term => {
    return term.charAt(0).toUpperCase() + term.slice(1);
  };

  handleClearButtonClick = () => {
    let emptyArray = [];
    this.setState({ results: emptyArray });
    this.props.changeFetchedResults(emptyArray);
    this.setState({ selectedOption: null });
    this.setState({ heading: "Select a Plant and Click on Search" });
  };

  showClear = () => {
    this.setState({ classN: "showButton" });
  };

  onInputChange(term) {
    this.setState({ term });
  }
  //https://data.sfgov.org/resource/vmnk-skih.json?$where=common_name=%27African%20Iris%27%20
  adQueryGenerator = index => {
    console.log(index);
    let where = this.state.selectedWhereOption[index].value;
    let condition = this.state.selectedConditionOption[index].value;
    let value = this.state.selectedValueOption[index].value;

    if (this.state.selectedConditionOption[index].label === "Equals") {
      //data.sfgov.org/resource/vmnk-skih.json?plant_type=Tree%20(evergreen)
      //data.sfgov.org/resource/vmnk-skih.json?$where=bloom_time=%27Summer%27
      const query = `https://data.sfgov.org/resource/vmnk-skih.json?$where=${where}%20${condition}%20%27${value}%27`;
      console.log({ query });
      return query;
    }

    const query = `https://data.sfgov.org/resource/vmnk-skih.json?$where=${where}%20${condition}%20%27%25${value}%25%27`;

    // switch(this.state.selectedWhereOption[index]){
    return query;
    // }
  };

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
