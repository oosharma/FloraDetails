import React, { Component } from "react";
import { modifyResult, sortByAttAndOrder } from "../../helper.js";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import Select from "react-select";

import "./PlantTable.css";
import {
  Row,
  Col,
  Span,
  BTd,
  Button,
  Container,
  Table,
  Display4,
  ButtonGroup,
  ButtonToolbar,
  BDiv
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

  handleAddorDelete = result => {
    if (this.props.utility === "Add") {
      this.props.handleAddorDelete(this.props.isAuthorized, result);

    } else {
      this.props.handleAddorDelete(result);

    }
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
      let width;
      if (item.length >= 20) {
        minWidth = "250px";
        width = "250px";

      } else if (item.length > 15) {
        minWidth = "200px";
        width = "200px";

      } else {
        minWidth = "150px";
        width = "150px";

      }

      if (item === "Name") {
        minWidth = "200px";
        width = "200px";
      }

      return (
        <th
          style={{ minWidth: minWidth, width: width }}
          onClick={this.props.sortToggle.bind(this, item, this.props.utility)}
          className={`${item === "Suitable Site Conditions" ? "head-2" : "head-1"} `}
        >
          {item}
          {this.sortSwitch(item)}
        </th>
      );
    });
    return columns;
  };

  render() {
    const rowOptionsStyle = {
      width: "50px"
    };
    const { pageNumber, rowItems } = this.props.limitItems;

    let rowItemsValue = {
      value: this.props.limitItems.rowItems,
      label: this.props.limitItems.rowItems
    };
    // this.setState({ rowItemsValue: rowItemsValue });

    const addedItems = this.props.addedItems;
    let dataSet = new Set();
    if (Array.isArray(addedItems)) {
      addedItems.forEach(arrayItem => {
        dataSet.add(arrayItem.commonName);
      });
    }

    if (this.props.tableData && this.props.tableData.length > 0) {
      let tableData = this.props.tableData;
      tableData.sort(
        sortByAttAndOrder(this.props.sortColumn, this.props.sortDirection)
      );

      let useTableData = [];

      let startIndex = pageNumber * rowItems;
      let lastItemIndex = Math.min(startIndex + rowItems, tableData.length);

      let totalRows = Math.ceil(tableData.length / rowItems);

      for (let i = startIndex; i < lastItemIndex; i++) {
        useTableData[i] = tableData[i];
      }

      const rowOptions = [];
      let obj1 = {};
      obj1["value"] = 5;
      obj1["label"] = 5;
      rowOptions.push(obj1);

      let obj2 = {};
      obj2["value"] = 10;
      obj2["label"] = 10;
      rowOptions.push(obj2);

      for (let i = 25; i <= Math.min(tableData.length, 100); i = i + 25) {
        var obj = {};
        let num;
        if (i > tableData.length) {
          num = tableData.length;
        } else {
          num = i;
        }
        obj["value"] = num;
        obj["label"] = num;
        rowOptions.push(obj);
        if (i == 50) {
          i += 25;
        }
      }

      let buttons;
      if (totalRows < 9) {
        // return (
        //   <>
        //   {symbolArray.map(symbolitem => <option>{symbolitem}</option>)}
        //   </>
        //  );
        buttons = (
          <>
            {[...Array(totalRows)].map((e, i) => (
              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  i,
                  "button",
                  this.props.utility
                )}
                className={pageNumber == i ? "activePage" : "pageStyle"}
              >
                {i + 1}
              </Button>
            ))}
          </>
        );
      } else {
        if (pageNumber < 4) {
          buttons = (
            <>
              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  "L",
                  "button",
                  this.props.utility,
                  totalRows
                )}
                className="pageStyle"
              >
                L
              </Button>

              {[...Array(5)].map((e, i) => {
                return (
                  <Button
                    onClick={this.props.itemChange.bind(
                      this,
                      i,
                      "button",
                      this.props.utility
                    )}
                    className={pageNumber == i ? "activePage" : "pageStyle"}
                  >
                    {i + 1}
                  </Button>
                );
              })}
              <Button className="pageStyle">...</Button>

              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  totalRows - 1,
                  "button",
                  this.props.utility
                )}
                className={
                  pageNumber == totalRows - 1 ? "activePage" : "pageStyle"
                }
              >
                {totalRows}
              </Button>
              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  "R",
                  "button",
                  this.props.utility,
                  totalRows
                )}
                className="pageStyle"
              >
                R
              </Button>
            </>
          );
        } else if (totalRows - pageNumber + 1 < 4) {
          buttons = (
            <>
              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  "L",
                  "button",
                  this.props.utility,
                  totalRows
                )}
                className="pageStyle"
              >
                L
              </Button>
              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  0,
                  "button",
                  this.props.utility
                )}
                className={pageNumber == 0 ? "activePage" : "pageStyle"}
              >
                1
              </Button>
              <Button className="pageStyle">...</Button>

              {[...Array(5)].map((e, i) => {
                return (
                  <Button
                    onClick={this.props.itemChange.bind(
                      this,
                      totalRows - 5 + i,
                      "button",
                      this.props.utility
                    )}
                    className={
                      pageNumber == totalRows - 5 + i
                        ? "activePage"
                        : "pageStyle"
                    }
                  >
                    {totalRows - 4 + i}
                  </Button>
                );
              })}

              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  "R",
                  "button",
                  this.props.utility,
                  totalRows
                )}
                className="pageStyle"
              >
                R
              </Button>
            </>
          );
        } else {
          buttons = (
            <>
              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  "L",
                  "button",
                  this.props.utility,
                  totalRows
                )}
                className="pageStyle"
              >
                L
              </Button>
              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  0,
                  "button",
                  this.props.utility
                )}
                className={pageNumber == 0 ? "activePage" : "pageStyle"}
              >
                1
              </Button>
              <Button className="pageStyle">...</Button>

              {[...Array(3)].map((e, i) => {
                return (
                  <Button
                    onClick={this.props.itemChange.bind(
                      this,
                      pageNumber - 1 + i,
                      "button",
                      this.props.utility
                    )}
                    className={
                      pageNumber == pageNumber - 1 + i
                        ? "activePage"
                        : "pageStyle"
                    }
                  >
                    {pageNumber + i}
                  </Button>
                );
              })}
              <Button className="pageStyle">...</Button>
              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  totalRows - 1,
                  "button",
                  this.props.utility
                )}
                className={
                  pageNumber === totalRows - 1 ? "activePage" : "pageStyle"
                }
              >
                {totalRows}
              </Button>
              <Button
                onClick={this.props.itemChange.bind(
                  this,
                  "R",
                  "button",
                  this.props.utility,
                  totalRows
                )}
                className="pageStyle"
              >
                R
              </Button>
            </>
          );
        }
      }

      return (
        <>
          {this.props.utility === "Add" ? (
            <p
              className={`p-1 pl-3 width-check table-p`}
            >
              Showing {tableData.length} item{tableData.length > 1 ? "s" : ""}.

              {tableData.length === 683 ? " Use filters to update your search." : ""}
            </p>
          ) : (
              <p className={`mt-0 pb-0 mb-0 pr-1 width-check`}></p>
            )}
          <BDiv className="width-check ">
            <Table
              className={`table-primary-1 mt-0 mb-0 table-responsive width-check `}
              striped

              hover
            >
              <thead>
                <tr>
                  <th className={"plant-table-col"} >Action</th>
                  <th className={"plant-table-col"} >Image</th>

                  {this.columnItems()}
                </tr>
              </thead>
              <tbody>
                {useTableData.map(result => {
                  return (
                    <>
                      <tr>
                        <BTd align="middle">
                          <Button
                            variant={`${this.state.btnVariant}`}
                            className={`${
                              this.state.btnClass
                              } shrinkTableButtons default-button ${
                              dataSet.has(result.commonName) ? "disabled" : ""
                              }`}
                            type="button"
                            onClick={() => {
                              this.handleAddorDelete(result);
                            }}
                          >
                            {this.props.utility === "Add" ? (
                              <>
                                {dataSet.has(result.commonName)
                                  ? "Saved"
                                  : "Save"}
                              </>
                            ) : (
                                "Delete"
                              )}
                          </Button>
                        </BTd>
                        <BTd
                          align="middle center"
                          style={{ height: "108px" }}
                        >
                          <img
                            width="80"
                            alt="not available"
                            // onError={() => {
                            //   console.log("errrrrrrrr");
                            // }}
                            src={
                              result && result.commonName
                                ? `https://flora-details-images.s3-us-west-1.amazonaws.com/${result.commonName
                                  .replace(/\s+/g, "")
                                  .replace(/"/g, "")
                                  .replace(/'/g, "")
                                  .replace(/,/g, "")
                                  .replace(/\//g, "")}01.jpg`
                                : ""
                            }
                          ></img>
                        </BTd>

                        {result.commonName ? (
                          <BTd align="middle">{result.commonName} </BTd>
                        ) : (
                            <BTd align="middle">-</BTd>
                          )}
                        {result.bloomTime ? (
                          <BTd align="middle">{result.bloomTime} </BTd>
                        ) : (
                            <BTd align="middle">-</BTd>
                          )}
                        {result.plantType ? (
                          <BTd align="middle">{result.plantType} </BTd>
                        ) : (
                            <BTd align="middle">-</BTd>
                          )}
                        {result.waterNeeds ? (
                          <BTd align="middle">{result.waterNeeds} </BTd>
                        ) : (
                            <BTd align="middle">-</BTd>
                          )}

                        {result.sizeAtMaturity ? (
                          <BTd align="middle">{result.sizeAtMaturity} </BTd>
                        ) : (
                            <BTd align="middle">-</BTd>
                          )}

                        {result.appropriateLocation ? (
                          <BTd align="middle">
                            {result.appropriateLocation}{" "}
                          </BTd>
                        ) : (
                            <BTd align="middle">-</BTd>
                          )}
                        {result.suitableSiteConditions ? (
                          <BTd align="middle">
                            {result.suitableSiteConditions}{" "}
                          </BTd>
                        ) : (
                            <BTd align="middle">-</BTd>
                          )}
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </Table>
            <Row
              alignItems="top"
              className="mb-4 mb-lg-5 p-3 t-footer width-check m-0 "
            >
              <Col
                order="2 md-1"
                col="col-12 md-6 xl-4"
                display="inline-flex"
                alignItems="xl-center"
                className="mb-2 mb-md-0 pl-0  shrink"
              >
                Showing {startIndex + 1} to {lastItemIndex} of {totalRows} Rows.
              </Col>
              <Col
                col="col-12 md-8 xl-4 pl-0  "
                display="inline-flex"
                alignItems="center"
                order="3 md-3 xl-2"
                className="pl-0  shrink"
              >
                Show
                <Select
                  // value={selectCondition}

                  onChange={this.props.rowItemChange.bind(
                    this,
                    "item",
                    this.props.utility
                  )}
                  options={rowOptions}
                  className="ml-2 mr-2 rowOptionStyle"
                  display="inline"
                  style={rowOptionsStyle}
                  value={rowItemsValue}
                // value={selectedConditionOption[index]}
                />
                Rows Per Page
              </Col>
              <Col
                col="col-12 md-6 xl-4  "
                className="mb-2 pl-0 pr-md-0 shrinkButton"
                order="1 md-2 xl-3"
              >
                <ButtonToolbar
                  float="md-right"
                  aria-label="Toolbar with button groups"
                >
                  <ButtonGroup aria-label="First group">{buttons}</ButtonGroup>
                </ButtonToolbar>
              </Col>
            </Row>
          </BDiv>
        </>
      );
    } else {
      if (
        this.props.utility === "Personal Delete" ||
        this.props.utility === "Delete"
      ) {
        return (
          <>
            <p className="p-3 width-check table-p">
              No data to display, update filters to get better results.
            </p>
          </>
        );
      }
      return <>
        <p className="p-3 width-check table-p">
          No data to display, update filters to get better results.
      </p>
      </>;
    }
  }
}
export default PlantTable;
