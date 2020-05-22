import React, { Component } from "react";
import { modifyResult, sortByAttAndOrder } from "../../helper.js";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import "./PlantTable.css";
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
      btnClass: "btn-primary"
    };
  }

  handleSelectChange = selectedOption => {
    this.setState({ selectedOption });
    this.setState({ term: selectedOption.label });
  };

  handleAddorDelete = result => {
    this.props.handleAddorDelete(result);
  };

  // columnItems = () => {

  //   let returnValue = items.map(item => {
  //     <th onClick={this.sortToggle.bind(this, item)} className="head-1">
  //       {item}
  //       {this.sortSwitch()}
  //     </th>;
  //   });
  //   return returnValue;
  // };

  sortSwitch(item) {
    if (this.props.sortColumn === "none") {
      return (
        <>
          <FaSort className="pl-2"></FaSort>
          {/* <FaSortUp></FaSortUp> */}
        </>
      );
    }
    if (this.props.sortColumn === item) {
      if (this.props.sortDirection === "ascending") {
        return <FaSortUp className="pl-2"></FaSortUp>;
      } else {
        return <FaSortDown className="pl-2"></FaSortDown>;
      }
    }
  }
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
      let minWidth;
      if (item.length >= 20) {
        minWidth = "250px";
      } else if (item.length > 15) {
        minWidth = "200px";
      } else {
        minWidth = "150px";
      }

      return (
        <th
          style={{ minWidth: minWidth }}
          onClick={this.props.sortToggle.bind(this, item, this.props.utility)}
          className="head-1"
        >
          {item}
          {this.sortSwitch(item)}
        </th>
      );
    });
    return columns;
  };

  render() {
    const addedItems = this.props.addedItems;
    let dataSet = new Set();
    if (addedItems) {
      addedItems.forEach(arrayItem => {
        dataSet.add(arrayItem.commonName);
      });
    }

    if (this.props.tableData && this.props.tableData.length > 0) {
      let tableData = this.props.tableData;
      tableData.sort(
        sortByAttAndOrder(this.props.sortColumn, this.props.sortDirection)
      );

      return (
        <>
          {this.props.utility === "Add" ? (
            <p
              className={`${this.state.classTable} mt-3 pb-0 mb-0 width-check`}
            >
              <em>
                {" "}
                Search results are being pulled from{" "}
                <a href="http://www.datasf.org" target="_blank">
                  {" "}
                  www.DataSF.org
                </a>
              </em>
            </p>
          ) : (
            <p className={`mt-0 pb-0 mb-0 pr-1 width-check`}>
              <em> Pinned results are being pulled from connected database</em>
            </p>
          )}
          <Table
            className={`table-primary-1 mt-1 pr-2 table-responsive width-check `}
            striped
            bordered
            hover
          >
            <thead>
              <tr>
                <th style={{ minWidth: "120px" }}>Action</th>

                {this.columnItems()}
              </tr>
            </thead>
            <tbody>
              {tableData.map(result => {
                return (
                  <>
                    <tr>
                      <td>
                        <Button
                          variant={`${this.state.btnVariant}`}
                          className={`${this.state.btnClass} default-button ${
                            dataSet.has(result.commonName) ? "disabled" : ""
                          }`}
                          type="button"
                          onClick={() => {
                            this.handleAddorDelete(result);
                          }}
                        >
                          {this.props.utility === "Add" ? (
                            <>
                              {dataSet.has(result.commonName) ? "Added" : "Add"}
                            </>
                          ) : (
                            "Delete"
                          )}
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
            <Display4 className="mt-3 width-check">
              Table Empty, Use Search Bar to Add Plants
            </Display4>
          </>
        );
      }
      return <></>;
    }
  }
}
export default PlantTable;
