import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import axios from "axios";
import { Table, Container, Display4, Row } from "bootstrap-4-react";

class App extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    bloom_time: null,
    plant_type: null,
    appropriate_location: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    addName: "",
    addBloom_time: "",
    addPlant_type: "",
    addAppropriate_location: "",
    emptyDB: 0,
    showPinned: true
  };
  addToDB = () => {
    console.log(this.state.addName);
    this.putDataToDB(this.state.addName);
  };
  changeAddItem = result => {
    this.setState(
      {
        addName: result.common_name,
        addBloom_time: result.bloom_time,
        addPlant_type: result.plant_type,
        addAppropriate_location: result.appropriate_location
      },
      () => {
        console.log("setState completed", this.state);
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
    axios.get("/api/items").then(res => this.setState({ data: res.data }));
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

    axios.post("/api/items", {
      id: idToBeAdded,
      message: message,
      bloom_time: this.state.addBloom_time,
      plant_type: this.state.addPlant_type,
      appropriate_location: this.state.addAppropriate_location
    });
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
    console.log("here");
    if (this.state.data.length <= 0) {
      this.setState({ showPinned: false });
      console.log("there");
    } else {
      this.setState({ showPinned: true });
      console.log("whrer");
    }
  };

  // here is our UI
  // it is easy to understand their functions when you
  // see them render into our screen
  render() {
    const { data } = this.state;

    if (this.state.data.length) {
      return (
        <>
          <SearchBar
            changeAddItem={this.changeAddItem.bind(this)}
            addToDB={this.addToDB.bind(this)}
          />

          <Container className="mt-5">
            <Row>
              <Display4>Pinned Results</Display4>
            </Row>
            <Table className striped bordered hover>
              <thead>
                <tr>
                  <th className="head-1">Name</th>
                  <th>Bloom Time</th>
                  <th>Plant Type</th>
                  <th>Appropriate Location</th>
                </tr>
              </thead>
              <tbody>
                {data.length <= 0
                  ? this.handleEmptyDb()
                  : data.map(dat => {
                      return (
                        <>
                          <tr key={data.message}>
                            <td>{dat.message}</td>
                            <td>{dat.bloom_time} </td>
                            <td>{dat.plant_type} </td>
                            <td>{dat.appropriate_location} </td>

                            <td
                              onClick={() =>
                                this.setState({ idToDelete: dat._id }, () =>
                                  this.deleteFromDB(this.state.idToDelete)
                                )
                              }
                            >
                              Delete
                            </td>
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
          <SearchBar
            changeAddItem={this.changeAddItem.bind(this)}
            addToDB={this.addToDB.bind(this)}
          />

          <Container className="mt-5">
            <Row>
              <Display4>Use Search to Find Plants and Pin them here</Display4>
            </Row>
          </Container>
        </>
      );
    }
  }
}

export default App;
