import React, { Component } from "react";
import { modifyResult } from "../../helper.js";
import { FaSortDown, FaSortUp } from "react-icons/fa";

import {
  Row,
  Col,
  Button,
  Container,
  Table,
  Display4
} from "bootstrap-4-react";

class PlantTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "", // either search results or db results
      btnVariant: "primary",
      btnClass: "btn-primary",
      sortDirection: "none",
      sortColumn: "none",
      sortedResults: this.props.tableData
    };
  }

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    this.setState({ term: selectedOption.label });
  };

  handleAddorDelete = result => {
    this.props.handleAddorDelete(result);
  };

  sortToggle(column) {
    if (this.state.sortDirection === "none") {
      this.setState({ sortDirection: "ascending" });
    }
    if (this.state.sortDirection === "ascending") {
      this.setState({ sortDirection: "descending" });
    }
    if (this.state.sortDirection === "descending") {
      this.setState({ sortDirection: "ascending" });
    }
    let that = this;
    this.setState({ sortColumn: column }, () => {
      let unsortedArray = this.props.tableData;
      console.log(unsortedArray.sort(this.sortByAttAndOrder()));
      console.log(unsortedArray);
      that.setState({ sortedResults: [...unsortedArray] });
    });
  }
  sortSwitch(item) {
    if (this.state.sortColumn === "none") {
      return (
        <>
          <FaSortDown></FaSortDown>
          <FaSortUp></FaSortUp>
        </>
      );
    }
    if (this.state.sortColumn === item) {
      if (this.state.sortDirection === "ascending") {
        return <FaSortUp></FaSortUp>;
      } else {
        return <FaSortDown></FaSortDown>;
      }
    }
  }

  sortByAttAndOrder() {
    let att = "";
    console.log(this.state.sortColumn);
    switch (this.state.sortColumn) {
      case "Name":
        att = "commonName";
        break;
      case "Bloom Time":
        att = "bloomTime";
        break;
      case "Plant Type":
        att = "plantType";
        break;
      case "Water Needs":
        att = "waterNeeds";
        break;
      case "Size at Maturity":
        att = "sizeAtMaturity";
        break;
      case "Suitable Site Conditions":
        att = "suitableSiteConditions";
        break;
      case "Appropriate Location":
        att = "appropriateLocation";
        break;
      default:
        break;
    }
    console.log({ att });
    let that = this;
    return function(a, b) {
      if (that.state.sortDirection === "ascending") {
        if (a[att] > b[att]) {
          return 1;
        } else if (a[att] < b[att]) {
          return -1;
        }
        return 0;
      } else {
        if (a[att] > b[att]) {
          return -1;
        } else if (a[att] < b[att]) {
          return 1;
        }
        return 0;
      }
    };
  }

  // columnItems = () => {

  //   let returnValue = items.map(item => {
  //     <th onClick={this.sortToggle.bind(this, item)} className="head-1">
  //       {item}
  //       {this.sortSwitch()}
  //     </th>;
  //   });
  //   return returnValue;
  // };

  columnItems = () => {
    const items = [
      "Name",
      "Bloom Time",
      "Plant Type",
      "Water Needs",
      "Size at Maturity",
      "Appropriate Location",
      "Suitable Site Conditions"
    ];

    let columns = items.map(item => {
      return (
        <th onClick={this.sortToggle.bind(this, item)} className="head-1">
          {item}
          {this.sortSwitch(item)}
        </th>
      );
    });
    return columns;
  };

  render() {
    if (this.props.tableData && this.props.tableData.length > 0) {
      return (
        <>
          <Table className={`table-primary-1 mt-1`} striped bordered hover>
            <thead>
              <tr>
                <th>Action</th>

                {this.columnItems()}
              </tr>
            </thead>
            <tbody>
              {this.props.tableData.map(result => {
                return (
                  <>
                    <tr>
                      <td>
                        <Button
                          variant={`${this.state.btnVariant}`}
                          className={`${this.state.btnClass} default-button`}
                          type="button"
                          onClick={() => {
                            this.handleAddorDelete(result);
                          }}
                        >
                          {this.props.utility}
                        </Button>
                      </td>

                      {result.commonName ? (
                        <td>{result.commonName} </td>
                      ) : (
                        <td>-</td>
                      )}
                      {result.bloomTime ? (
                        <td>{result.bloomTime} </td>
                      ) : (
                        <td>-</td>
                      )}
                      {result.plantType ? (
                        <td>{result.plantType} </td>
                      ) : (
                        <td>-</td>
                      )}
                      {result.waterNeeds ? (
                        <td>{result.waterNeeds} </td>
                      ) : (
                        <td>-</td>
                      )}

                      {result.sizeAtMaturity ? (
                        <td>{result.sizeAtMaturity} </td>
                      ) : (
                        <td>-</td>
                      )}

                      {result.appropriateLocation ? (
                        <td>{result.appropriateLocation} </td>
                      ) : (
                        <td>-</td>
                      )}
                      {result.suitableSiteConditions ? (
                        <td>{result.suitableSiteConditions} </td>
                      ) : (
                        <td>-</td>
                      )}
                    </tr>
                  </>
                );
              })}
            </tbody>
          </Table>
        </>
      );
    } else {
      if (
        this.props.utility === "Personal Delete" ||
        this.props.utility === "Delete"
      ) {
        return (
          <>
            <Row>
              <Display4 className="mt-3">
                Use Search to Find Plants and Pin them here
              </Display4>
            </Row>
          </>
        );
      }
      return <></>;
    }
  }
}
export default PlantTable;
