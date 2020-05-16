import React, { Component } from "react";
import { modifyResult } from "../../helper.js";

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

  render() {
    if (this.props.tableData && this.props.tableData.length > 0) {
      return (
        <>
          <Table className={`table-primary-1 mt-1`} striped bordered hover>
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
      return <> </>;
    }
  }
}
export default PlantTable;
