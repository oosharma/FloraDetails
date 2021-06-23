import React, { Component } from "react";
import style from "./SearchBar.css";
import { Row, Col, Button, Display4, BDiv, Modal, Container } from "bootstrap-4-react";
import Select from "react-select";
import { modifyResult, filterArr, randomize } from "../../helper.js";
import options from "./optionsData.js";
import Filters from "../Filters/Filters";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import whereOptions, {

  nameValues,

} from "./selectOptions";
function SearchBar(props) {

  const handleAdButtonClick = () => {

  };
  const handleFilterButtonClick = () => {

  };
  return (
    <div className="search-bar">

      <Select
        // value={selectProperty}
        //onChange={handleValueChange.bind(index)}
        options={nameValues}
        className="search-box"
        display="inline"
        isClearable={true}
      // style={}
      />
      {/* <Button
        variant="primary"
        className="btn-primary default-button filters-button"
        type="button"
        onClick={
          handleFilterButtonClick()
        }

      >
        Filters
      </Button> */}
      <Button primary className="btn-primary default-button filters-button"
        data-toggle="modal" data-target="#exampleModal">Filters</Button>

      <Button
        variant="primary"
        className="btn-primary default-button  "
        type="button"
        onClick={
          handleAdButtonClick()
        }

      >
        Search
      </Button>


      {/* Button trigger Modal */}

      {/* Modal */}
      <Modal id="exampleModal" fade>
        <Modal.Dialog centered>
          <Modal.Content>
            <Modal.Body>
              <Filters
                type={"mobile"}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button secondary data-dismiss="modal">Close</Button>
              <Button primary data-dismiss="modal">Save changes</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Dialog>
      </Modal>


    </div>
  );
}
export default SearchBar;
