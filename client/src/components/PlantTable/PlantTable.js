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

                      {result.common_name ? (
                        <td>{result.common_name} </td>
                      ) : (
                        <td>-</td>
                      )}
                      {result.bloom_time ? (
                        <td>{result.bloom_time} </td>
                      ) : (
                        <td>-</td>
                      )}
                      {result.plant_type ? (
                        <td>{result.plant_type} </td>
                      ) : (
                        <td>-</td>
                      )}
                      {result.water_needs ? (
                        <td>{result.water_needs} </td>
                      ) : (
                        <td>-</td>
                      )}

                      {result.size_at_maturity ? (
                        <td>{result.size_at_maturity} </td>
                      ) : (
                        <td>-</td>
                      )}

                      {result.appropriate_location ? (
                        <td>{result.appropriate_location} </td>
                      ) : (
                        <td>-</td>
                      )}
                      {result.suitable_site_conditions ? (
                        <td>{result.suitable_site_conditions} </td>
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
