import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import PlantTable from "./components/PlantTable/PlantTable";

import axios from "axios";
import { Table, Container, Display4, Row } from "bootstrap-4-react";
import style from "./App.css";

class App extends Component {
  // initialize our state
  state = {
    regName: "",
    regEmail: "",
    regPass: "",
    regMsg: null,
    data: [],
    id: 0,
    commonName: null,
    bloomTime: null,
    plantType: null,
    appropriateLocation: null,
    waterNeeds: null,
    sizeAtMaturity: null,
    suitableSiteConditions: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
    addName: "",
    addbloomTime: "",
    addplantType: "",
    addappropriateLocation: "",
    addwaterNeeds: "",
    addsizeAtMaturity: "",
    addsuitableSiteConditions: "",
    emptyDB: 0,
    showPinned: true,
    deleteBtnVariant: "primary",
    deleteBtnClass: "btn-primary",
    fetch: true,
    test: null,
    sort: [
      { sortDirection: "none", sortColumn: "none" },
      { sortDirection: "none", sortColumn: "none" },
      { sortDirection: "none", sortColumn: "none" },
      { sortDirection: "none", sortColumn: "none" }
    ],
    error: {
      msg: null,
      status: null,
      id: null
    },
    auth: {
      token: localStorage.getItem("token"),
      isAuthorized: null,
      isLoading: false,
      user: null
    }
  };
  addToDB = () => {
    this.putDataToDB(this.state.addName);
    this.setState({ fetch: true });
  };
  changeAddItem = result => {
    // var modifiedResult = modifyResult(result);
    this.setState(
      {
        addName: result.commonName,
        addbloomTime: result.bloomTime,
        addplantType: result.plantType,
        addappropriateLocation: result.appropriateLocation,
        addwaterNeeds: result.waterNeeds,
        addsizeAtMaturity: result.sizeAtMaturity,
        addsuitableSiteConditions: result.suitableSiteConditions
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
    this.loadUser();
  }

  userRegister(regName, regEmail, regPass) {
    //attemptRegistering.
    // on success
    // localStorage.setItem("token", res.token);
    //do same for login
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
  putDataToDB = commonName => {
    let config = this.tokenConfig();
    let currentIds = this.state.data.map(data => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    var dataSet = new Set();
    this.state.data.forEach(arrayItem => {
      dataSet.add(arrayItem.commonName);
    });
    if (dataSet.has(commonName)) {
      window.alert("item already in pinned section");
    } else {
      axios.post(
        "/api/items",
        {
          id: idToBeAdded,
          commonName: commonName,
          bloomTime: this.state.addbloomTime,
          plantType: this.state.addplantType,
          appropriateLocation: this.state.addappropriateLocation,
          waterNeeds: this.state.addwaterNeeds,
          sizeAtMaturity: this.state.addsizeAtMaturity,
          suitableSiteConditions: this.state.addsuitableSiteConditions
        },
        config
      );
    }
  };
  // handleSort = result => {
  //   let newObj = this.state.sort;
  //   newObj[result.i].sortColumn = result.sortColumn;
  //   newObj[result.i].sortDirection = result.sortDirection;
  //   this.setState({ sort: newObj });
  // };

  deletePersonalItem = result => {
    //  const config = this.tokenConfig();
    //  const body = JSON.stringify({ name, email, password });
    let config = this.tokenConfig();

    let updateItem = this.state.auth.user.items.filter(item => {
      return item.commonName != result.commonName;
    });

    const body = {
      filter: { email: this.state.auth.user.email },
      update: { items: updateItem }
    };
    console.log(body);
    axios.post("api/userItem", body, config).then(res => {
      this.personalDeleteSuccess(res.data);
    });
  };

  addPersonalItem = result => {
    let postFlag = true;
    if (
      this.state.auth.user &&
      this.state.auth.user.items &&
      this.state.auth.user.items.length > 0
    ) {
      let dataSet = new Set();
      this.state.auth.user.items.forEach(arrayItem => {
        dataSet.add(arrayItem.commonName);
      });
      if (dataSet.has(result.common_name)) {
        window.alert("item already in pinned section");
        postFlag = false;
      }
    }
    if (postFlag) {
      let config = this.tokenConfig();

      //  const config = this.tokenConfig();
      //  const body = JSON.stringify({ name, email, password });
      let updateRow = [
        {
          id: 1,
          commonName: result.common_name,
          bloomTime: result.bloom_time,
          plantType: result.plant_type,
          appropriateLocation: result.appropriate_location,
          waterNeeds: result.water_needs,
          sizeAtMaturity: result.size_at_maturity,
          suitableSiteConditions: result.suitable_site_conditions
        }
      ];

      let updateItem =
        this.state.auth.user && this.state.auth.user.items
          ? [...updateRow, ...this.state.auth.user.items]
          : updateRow;

      const body = {
        filter: { email: this.state.auth.user.email },
        update: { items: updateItem }
      };
      console.log(body);
      axios.post("api/userItem", body, config).then(res => {
        console.log("this is response");
        console.log(res.data);
        this.personalAddSuccess(res.data);
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
    let config = this.tokenConfig();

    let objIdToDelete = null;
    this.state.data.forEach(dat => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });
    axios.delete(`/api/items/${idTodelete}`, config).then(() => {
      this.setState({ fetch: true });
      console.log("herree");
    });
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

  sortToggle(column, utility) {
    let item = utility === "Add" ? 0 : 1;

    if (utility === "Add") {
      item = 0;
    }
    if (utility === "Delete") {
      item = 1;
    }
    if (utility === "Personal Delete") {
      item = 2;
    }
    if (utility === "personalDelete") {
      item = 3;
    }

    let updatedSort = this.state.sort;

    updatedSort[item].sortColumn = column;

    if (
      this.state.sort[item].sortDirection === "none" ||
      this.state.sort[item].sortDirection === "descending"
    ) {
      updatedSort[item].sortDirection = "ascending";
    } else {
      updatedSort[item].sortDirection = "descending";
    }

    this.setState({ sort: updatedSort }, () => {});
  }

  regNameChange(event) {
    this.setState({ regName: event.currentTarget.value });
  }
  regEmailChange(event) {
    this.setState({ regEmail: event.currentTarget.value });
  }
  regPassChange(event) {
    this.setState({ regPass: event.currentTarget.value });
  }
  addReg() {
    this.userRegister(
      this.state.regName,
      this.state.regEmail,
      this.state.regPass
    );
  }

  userLoaded = res => {
    console.log({ res });
    let authUpdate = {
      token: localStorage.getItem("token"),
      isAuthorized: true,
      isLoading: false,
      user: res.data
    };

    this.setState({ auth: authUpdate });

    this.clearErrors();
  };

  userRegister = (name, email, password) => {
    const config = this.tokenConfig();
    const body = JSON.stringify({ name, email, password });
    console.log({ body });
    axios
      .post("api/users", body, config)
      .then(res => {
        this.registerSuccess(res.data);
      })
      .catch(err => {
        //  errorUpdate(err);
        this.updateError(err);
      });
  };

  registerSuccess = res => {
    let authUpdate = {
      token: res.token,
      isAuthorized: true,
      isLoading: false,
      user: res.user
    };
    console.log(res.user);
    localStorage.setItem("token", res.token);
    this.setState({ auth: authUpdate });
    this.clearErrors();
  };

  loadUser = () => {
    let authUpdate = { ...this.state.auth, isLoading: true };
    this.setState({ auth: authUpdate });
    console.log(this.state.auth);
    const config = this.tokenConfig();
    console.log({ config });
    axios
      .get("api/auth/user", config)
      .then(res => {
        this.userLoaded(res);
        console.log("user Loaded");
      })
      .catch(err => {
        this.updateError(err);
      });
  };

  clearErrors = () => {
    let errorUpdate = {
      msg: null,
      status: null,
      id: null
    };
    this.setState({ error: errorUpdate });
  };
  updateError = (err, id) => {
    console.log("herwerwe");
    localStorage.removeItem("token");
    let authUpdate = {
      token: localStorage.getItem("token"),
      isAuthorized: null,
      isLoading: false,
      user: null
    };
    this.setState({ auth: authUpdate });

    let errorUpdate = {
      msg: err.response.data,
      status: err.response.status,
      id: null
    };
    this.setState({ error: errorUpdate });
  };

  tokenConfig = () => {
    // Get token from localstorage
    const token = this.state.auth.token;

    // Headers
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };

    // If token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  render() {
    const authLinks = (
      <>
        <p>
          <strong>
            {this.state.auth.user
              ? `Welcome ${this.state.auth.user.name}`
              : null}
          </strong>
        </p>

        <p>
          <button onClick={this.logout.bind(this)}>Logout</button>
        </p>
      </>
    );

    const guestLinks = (
      <>
        <h1>Register</h1>
        <p>Name</p>
        <textarea
          value={this.state.regName}
          onChange={this.regNameChange.bind(this)}
        ></textarea>
        <p>Email(s)</p>
        <textarea
          value={this.state.regEmail}
          onChange={this.regEmailChange.bind(this)}
        ></textarea>

        <p>Password(s)</p>
        <textarea
          value={this.state.regPass}
          onChange={this.regPassChange.bind(this)}
        ></textarea>
        <p>
          <button onClick={this.addReg.bind(this)}>Register</button>
        </p>

        <h1> Login</h1>

        <p>Email(s)</p>
        <textarea
          value={this.state.logEmail}
          onChange={this.logEmailChange.bind(this)}
        ></textarea>

        <p>Password</p>
        <textarea
          value={this.state.logPass}
          onChange={this.logPassChange.bind(this)}
        ></textarea>
        <p>
          <button onClick={this.addlog.bind(this)}>Login</button>
        </p>
      </>
    );
    const personalTables = (
      <>
        <h1>PersonalTable</h1>
        {this.state.auth.user && this.state.auth.user.items ? (
          <PlantTable
            tableData={this.state.auth.user.items}
            sortToggle={this.sortToggle.bind(this)}
            sortColumn={this.state.sort[2].sortColumn}
            sortDirection={this.state.sort[2].sortDirection}
            handleAddorDelete={this.changeAddItem.bind(this)}
            utility="Personal Add"
          ></PlantTable>
        ) : null}
      </>
    );

    // if (this.state.auth.isAuthorized) {
    //   {
    //     return personalTables;
    //   }
    // }

    return (
      <>
        <Container className="m-3 m-md-5 mt-0  ">
          {this.state.error.id === "REGISTER_FAIL" ||
          this.state.error.id === "LOGIN_FAIL" ? (
            <p>{this.state.error.msg.msg}</p>
          ) : (
            <></>
          )}
          {this.state.auth.isAuthorized === true ? authLinks : guestLinks}

          <SearchBar
            changeFetchedResults={this.changeFetchedResults.bind(this)}
          />
          <PlantTable
            tableData={this.state.fetchedResults}
            sortToggle={this.sortToggle.bind(this)}
            sortColumn={this.state.sort[0].sortColumn}
            sortDirection={this.state.sort[0].sortDirection}
            handleAddorDelete={this.changeAddItem.bind(
              this,
              this.state.auth.isAuthorized
            )}
            utility="Add"
          />
          <Row>
            <Display4 className="mt-3 mb-0">Pinned Results</Display4>
          </Row>

          {this.state.auth.isAuthorized === true
            ? personalTables
            : publicTables}

          <ul>
            <li>
              <p className={`mt-0 pb-0 mb-0 `}>
                <em>
                  {" "}
                  This web-app is developed by{" "}
                  <a target="_blank" href="http://www.iamsharma.com">
                    iamSharma
                  </a>{" "}
                  using the MERN stack (MongoDB, Express JS, React JS, Node JS)
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
  }
}

export default App;
