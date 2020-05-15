import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import PlantTable from "./components/PlantTable/PlantTable";
import axios from "axios";
import { Table, Container, Display4, Row } from "bootstrap-4-react";
import style from "./App.css";

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    bloom_time: null,
    plant_type: null,
    appropriate_location: null,
    water_needs: null,
    size_at_maturity: null,
    suitable_site_conditions: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    addName: "",
    addBloom_time: "",
    addPlant_type: "",
    addAppropriate_location: "",
    addWater_needs: "",
    addSize_at_maturity: "",
    addSuitable_site_conditions: "",

    emptyDB: 0,
    showPinned: true,
    deleteBtnVariant: "primary",
    deleteBtnClass: "btn-primary",
    fetch: true,
    test: null
  };
  addToDB = () => {
    this.putDataToDB(this.state.addName);
    this.setState({ fetch: true });
  };
  changeAddItem = result => {
    // var modifiedResult = modifyResult(result);
    this.setState(
      {
        addName: result.common_name,
        addBloom_time: result.bloom_time,
        addPlant_type: result.plant_type,
        addAppropriate_location: result.appropriate_location,
        addWater_needs: result.water_needs,
        addSize_at_maturity: result.size_at_maturity,
        addSuitable_site_conditions: result.suitable_site_conditions
      },
      () => {
        this.addToDB();
      }
    );
  };
  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    if (this.state.fetch) {
      axios.get("/api/items").then(res => this.setState({ data: res.data }));
      this.setState({ fetch: false });
    }
  };

  // getDataFromDb = () => {
  //   fetch("http://localhost:3001/api/getData")
  //     .then(data => data.json())
  //     .then(res => this.setState({ data: res.data }));
  // };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    var dataSet = new Set();
    this.state.data.forEach(arrayItem => {
      dataSet.add(arrayItem.message);
    });
    if (dataSet.has(message)) {
      window.alert("item already in pinned section");
    } else {
      axios.post("/api/items", {
        id: idToBeAdded,
        message: message,
        bloom_time: this.state.addBloom_time,
        plant_type: this.state.addPlant_type,
        appropriate_location: this.state.addAppropriate_location,
        water_needs: this.state.addWater_needs,
        size_at_maturity: this.state.addSize_at_maturity,
        suitable_site_conditions: this.state.addSuitable_site_conditions
      });
    }
  };

  handleDelete = result => {
    this.setState({ idToDelete: result._id }, () =>
      this.deleteFromDB(this.state.idToDelete)
    );
  };
  changeFetchedResults = result => {
    var modifiedResult = modifyResult(result);

    this.setState({ fetchedResults: modifiedResult });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });
    axios
      .delete(`/api/items/${idTodelete}`)
      .then(this.setState({ fetch: true }));
  };

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    let objIdToUpdate = null;
    parseInt(idToUpdate);
    this.state.data.forEach(dat => {
      if (dat.id === idToUpdate) {
        objIdToUpdate = dat._id;
      }
    });

    axios.post("http://localhost:3001/api/updateData", {
      id: objIdToUpdate,
      update: { message: updateToApply }
    });
  };
  handleEmptyDb = () => {
    // this.setState({
    //   emptyDB: true
    // });
    // this.setState({ emptyDB: 1 });
    return "Empty... please create a search and pin your favorite plants";
  };
  checkDbEmpty = () => {
    if (this.state.data.length <= 0) {
      this.setState({ showPinned: false });
    } else {
      this.setState({ showPinned: true });
    }
  };

  render() {
    const { data } = this.state;
    if (this.state.data.length) {
      return (
        <>
          <Container className="m-3 m-md-5 mt-0  ">
            <SearchBar
              changeAddItem={this.changeAddItem.bind(this)}
              changeFetchedResults={this.changeFetchedResults.bind(this)}
            />
            <PlantTable
              tableData={this.state.fetchedResults}
              handleAddorDelete={this.changeAddItem.bind(this)}
              utility="Add"
            />
            <Row>
              <Display4 className="mt-3 mb-0">Pinned Results</Display4>
            </Row>
            <p className={`mt-0 pb-0 mb-0 `}>
              <em> Pinned results are being pulled from connected database</em>
            </p>
            <PlantTable
              tableData={data}
              handleAddorDelete={this.handleDelete.bind(this)}
              utility="Delete"
            />
            <ul>
              <li>
                <p className={`mt-0 pb-0 mb-0 `}>
                  <em>
                    {" "}
                    This web-app is developed by{" "}
                    <a target="_blank" href="http://www.iamsharma.com">
                      iamSharma
                    </a>{" "}
                    using the MERN stack (MongoDB, Express JS, React JS, Node
                    JS)
                  </em>
                </p>
              </li>
              <li>
                <p className={`mt-0 pb-0 mb-0 `}>
                  <em>
                    {" "}
                    Checkout its source code on GitHub:{" "}
                    <a
                      target="_blank"
                      href="https://github.com/oosharma/FloraDetails"
                    >
                      https://github.com/oosharma/FloraDetails
                    </a>
                  </em>
                </p>
              </li>
            </ul>
          </Container>
        </>
      );
    } else {
      return (
        <>
          <Container className="m-4">
            <SearchBar
              changeAddItem={this.changeAddItem.bind(this)}
              addToDB={this.addToDB.bind(this)}
              changeFetchedResults={this.changeFetchedResults.bind(this)}
            />
            <p>hello</p>
            <PlantTable
              tableData={this.state.fetchedResults}
              handleAddorDelete={this.changeAddItem.bind(this)}
              utility="Add"
            />

            <Row>
              {/* <Display4>Use Search to Find Plants and Pin them here</Display4> */}
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default App;
