import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
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
<<<<<<< HEAD
    showPinned: true
=======
    showPinned: true,
    deleteBtnVariant: "primary",
    deleteBtnClass: "btn-primary",
    fetch: true,
    test: null
>>>>>>> test
  };
  addToDB = () => {
    this.putDataToDB(this.state.addName);
    this.setState({ fetch: true });
  };
  changeAddItem = result => {
    var common_name = result.common_name || "-";
    common_name = common_name.replace(/;/g, ", ");

    var bloom_time = result.bloom_time || "-";
    bloom_time = bloom_time.replace(/;/g, ", ");

    var plant_type = result.plant_type || "-";
    plant_type = plant_type.replace(/;/g, ", ");

    var water_needs = result.water_needs || "-";
    water_needs = water_needs.replace(/;/g, ", ");

    var size_at_maturity = result.size_at_maturity || "-";
    size_at_maturity = size_at_maturity.replace(/;/g, ", ");

    var appropriate_location = result.appropriate_location || "-";
    appropriate_location = appropriate_location.replace(/;/g, ", ");

    var suitable_site_conditions = result.suitable_site_conditions || "-";
    suitable_site_conditions = suitable_site_conditions.replace(/;/g, ", ");

    this.setState(
      {
        addName: common_name,
        addBloom_time: bloom_time,
        addPlant_type: plant_type,
        addAppropriate_location: appropriate_location,
        addWater_needs: water_needs,
        addSize_at_maturity: size_at_maturity,
        addSuitable_site_conditions: suitable_site_conditions
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
    axios.delete(`/api/items/${idTodelete}`);
    this.setState({ fetch: true });
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
              addToDB={this.addToDB.bind(this)}
            />

            <Row>
              <Display4 className="mt-3 mb-0">Pinned Results</Display4>
            </Row>
            <p className={`mt-0 pb-0 mb-0 `}>
              <em> Pinned results are being pulled from connected database</em>
            </p>
            <Table className={`table-primary-1 mt-1 `} striped bordered hover>
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
                {data.length <= 0
                  ? this.handleEmptyDb()
                  : data.map(dat => {
                      return (
                        <>
                          <tr key={data.message}>
                            <td
                              onClick={() =>
                                this.setState({ idToDelete: dat._id }, () =>
                                  this.deleteFromDB(this.state.idToDelete)
                                )
                              }
                            >
                              Delete
                            </td>
                            <td>{dat.message}</td>
                            <td>{dat.bloom_time} </td>
                            <td>{dat.plant_type} </td>
                            <td>{dat.water_needs} </td>
                            <td>{dat.size_at_maturity} </td>
                            <td>{dat.appropriate_location} </td>
                            <td>{dat.suitable_site_conditions} </td>
                          </tr>
                        </>
                      );
                    })}
              </tbody>
            </Table>
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
