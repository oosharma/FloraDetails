import React, { Component } from "react";
import style from "./SearchBar.css";
import { Row, Col, Button, Display4, BDiv } from "bootstrap-4-react";
import Select from "react-select";
import { modifyResult, filterArr, randomize } from "../../helper.js";
import options from "./optionsData.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import whereOptions, {

  nameValues,

} from "./selectOptions";
function SearchBar(props) {

  const handleAdButtonClick = () => {

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
      <Button
        variant="primary"
        className="btn-primary default-button  "
        type="button"
        onClick={
          handleAdButtonClick()
        }

      >
        Filter
      </Button>
    </div>
  );
}
export default SearchBar;
