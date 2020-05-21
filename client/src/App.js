import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import PlantTable from "./components/PlantTable/PlantTable";

import axios from "axios";
import {
  Nav,
  Form,
  Container,
  Display4,
  Row,
  Button,
  Alert
} from "bootstrap-4-react";
import Modal from "react-bootstrap4-modal";

import { modifyResult } from "./helper.js";
import style from "./App.css";

class App extends Component {
  // initialize our state
  state = {
    finalPublicTableCheck: false,
    finalCheck: false,
    regName: "",
    regEmail: "",
    regPass: "",
    regMsg: null,
    regModal: false,
    logEmail: "",
    logPass: "",
    logModal: false,
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
    addItem: {},
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

  changeAddItem = (isAuthorized, result) => {
    // var modifiedResult = modifyResult(result);
    if (isAuthorized) {
      this.addPersonalItem(result);
    } else {
      let addItem = JSON.parse(JSON.stringify(result));
      this.setState({ addItem: addItem }, () => {
        this.addToPulicDB();
      });
    }
  };

  addPersonalItem = result => {
    console.log("result is " + JSON.stringify(result));
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
      if (dataSet.has(result.commonName)) {
        window.alert("item already in pinned section");
        postFlag = false;
      }
    }
    if (postFlag) {
      let config = this.tokenConfig();
      const {
        commonName,
        bloomTime,
        plantType,
        appropriateLocation,
        waterNeeds,
        sizeAtMaturity,
        suitableSiteConditions,
        ...otherPart
      } = result;
      //  const config = this.tokenConfig();
      //  const body = JSON.stringify({ name, email, password });
      const updatedObj = {
        commonName,
        bloomTime,
        plantType,
        appropriateLocation,
        waterNeeds,
        sizeAtMaturity,
        suitableSiteConditions
      };
      let updateRow = [updatedObj];

      let updateItem =
        this.state.auth.user && this.state.auth.user.items
          ? [...updateRow, ...this.state.auth.user.items]
          : updateRow;

      const body = {
        filter: { email: this.state.auth.user.email },
        update: { items: updateItem }
      };
      axios.post("api/userItem", body, config).then(res => {
        this.loadUser();
      });
    }
  };

  addToPulicDB = () => {
    let commonName = this.state.addItem.commonName;
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
      axios
        .post("/api/items", {
          id: idToBeAdded,
          commonName: this.state.addItem.commonName,
          bloomTime: this.state.addItem.bloomTime,
          plantType: this.state.addItem.plantType,
          appropriateLocation: this.state.addItem.appropriateLocation,
          waterNeeds: this.state.addItem.waterNeeds,
          sizeAtMaturity: this.state.addItem.sizeAtMaturity,
          suitableSiteConditions: this.state.addItem.suitableSiteConditions
        })
        .then(res => {
          this.setState({ fetch: true });
        })
        .catch(err => {
          this.setState({ fetch: true });
        });
    }
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 500);
      this.setState({ intervalIsSet: interval });
    }
    this.loadUser();
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    if (this.state.fetch) {
      axios
        .get("/api/items")
        .then(res => {
          this.setState({ data: res.data, fetch: false });
        })
        .finally(() => {
          this.setState({ finalPublicTableCheck: true });
        });
    }
  };

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
    axios.post("api/userItem", body, config).then(res => {
      this.loadUser();
    });
  };

  handleDelete = result => {
    this.setState({ idToDelete: result._id }, () =>
      this.deleteFromDB(this.state.idToDelete)
    );
  };
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
      .then(() => {
        this.setState({ fetch: true });
        console.log("herree");
      })
      .catch(() => {
        this.setState({ fetch: true });
      });
  };

  // Being passed to SearchBar
  changeFetchedResults = result => {
    var modifiedResult = modifyResult(result);
    this.setState({ fetchedResults: modifiedResult });
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
    let updatedSort = this.state.sort;
    updatedSort[item].sortColumn = column;

    // toggle sort direction
    if (
      this.state.sort[item].sortDirection === "none" ||
      this.state.sort[item].sortDirection === "descending"
    ) {
      updatedSort[item].sortDirection = "ascending";
    } else {
      updatedSort[item].sortDirection = "descending";
    }
    this.setState({ sort: updatedSort });
  }

  userLogin = () => {
    let email = this.state.logEmail;
    let password = this.state.logPass;
    const config = this.tokenConfig();
    const body = JSON.stringify({ email, password });
    axios
      .post("api/auth", body, config)
      .then(res => {
        this.loginSuccess(res.data);
      })
      .catch(err => {
        this.updateError(err, "LOGIN_FAIL");
      });
  };

  registerSuccess = res => {
    let authUpdate = {
      token: res.token,
      isAuthorized: true,
      isLoading: false,
      user: res.user
    };
    localStorage.setItem("token", res.token);
    this.setState({ auth: authUpdate });
    this.clearErrors();
    this.clearSearchBarTable();
    this.toggleRegModal();
  };

  loginSuccess = res => {
    let authUpdate = {
      token: res.token,
      isAuthorized: true,
      isLoading: false,
      user: res.user
    };
    localStorage.setItem("token", res.token);
    this.setState({ auth: authUpdate });
    this.clearErrors();
    this.clearSearchBarTable();
    this.toggleLogModal();
  };

  clearSearchBarTable = () => {
    let emptyArray = [];
    this.setState({ fetchedResults: emptyArray });
  };

  userRegister = () => {
    let name = this.state.regName;
    let email = this.state.regEmail;
    let password = this.state.regPass;

    const config = this.tokenConfig();
    const body = JSON.stringify({ name, email, password });

    axios
      .post("api/users", body, config)
      .then(res => {
        this.registerSuccess(res.data);
      })
      .catch(err => {
        this.updateError(err, "REGISTER_FAIL");
      });
  };

  userLoaded = res => {
    let authUpdate = {
      token: localStorage.getItem("token"),
      isAuthorized: true,
      isLoading: false,
      user: res.data
    };

    this.setState({ auth: authUpdate });

    this.clearErrors();
  };

  loadUser = () => {
    let authUpdate = { ...this.state.auth, isLoading: true };
    this.setState({ auth: authUpdate });
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
      })
      .finally(() => {
        this.setState({ finalCheck: true });
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
    this.clearAuth();
    let errorUpdate = {
      msg: err.response.data,
      status: err.response.status,
      id: id
    };
    console.log("this.state.error.msg.msg");
    this.setState({ error: errorUpdate });
  };
  clearAuth = () => {
    localStorage.removeItem("token");
    let authUpdate = {
      token: localStorage.getItem("token"),
      isAuthorized: null,
      isLoading: false,
      user: null
    };
    this.setState({ auth: authUpdate });
  };

  logout = () => {
    this.clearAuth();
    this.clearSearchBarTable();
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

  toggleRegModal = () => {
    this.setState({ regName: "", regEmail: "", regPass: "" });
    this.setState({ regModal: !this.state.regModal });
    this.clearErrors();
  };

  toggleLogModal = () => {
    this.setState({ logName: "", logEmail: "", logPass: "" });
    this.setState({ logModal: !this.state.logModal });
    this.clearErrors();
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRegSubmit = e => {
    e.preventDefault();
    this.userRegister();
  };

  render() {
    const authLinks = (
      <>
        <Nav.ItemLink>
          <strong>
            {this.state.auth.user
              ? `Welcome ${this.state.auth.user.name}`
              : null}
          </strong>
        </Nav.ItemLink>
        <Nav.ItemLink active href="#" onClick={this.logout.bind(this)}>
          Logout
        </Nav.ItemLink>
      </>
    );
    const guestLinks = (
      <>
        <Nav.ItemLink onClick={this.toggleRegModal} active href="#">
          Register
        </Nav.ItemLink>
        <Nav.ItemLink onClick={this.toggleLogModal} href="#">
          Login
        </Nav.ItemLink>
      </>
    );

    const { data } = this.state;

    const publicTables = (
      <>
        {this.state.finalPublicTableCheck ? (
          <>
            <h1 className={`mt-2`}>Public Table</h1>

            <PlantTable
              tableData={data}
              handleAddorDelete={this.handleDelete.bind(this)}
              sortToggle={this.sortToggle.bind(this)}
              sortColumn={this.state.sort[1].sortColumn}
              sortDirection={this.state.sort[1].sortDirection}
              utility="Delete"
            />
          </>
        ) : (
          <></>
        )}
      </>
    );
    const footer = (
      <>
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
      </>
    );
    const personalTables = (
      <>
        {this.state.auth.user && this.state.auth.user.items ? (
          <>
            <Display4 className={`mt-2`}>
              {this.state.auth.user.name}'s Table
            </Display4>

            <PlantTable
              tableData={this.state.auth.user.items}
              sortToggle={this.sortToggle.bind(this)}
              sortColumn={this.state.sort[2].sortColumn}
              sortDirection={this.state.sort[2].sortDirection}
              handleAddorDelete={this.deletePersonalItem.bind(this)}
              utility="Personal Delete"
            ></PlantTable>
          </>
        ) : (
          <>
            <Row>
              <Display4 className="mt-3">
                Table Empty, Use Search Bar to Add Plants
              </Display4>
            </Row>
          </>
        )}
      </>
    );

    // if (this.state.auth.isAuthorized) {
    //   {
    //     return personalTables;
    //   }
    // }

    return (
      <>
        {this.state.finalCheck && this.state.finalPublicTableCheck ? (
          <>
            <>
              <Container className="m-3 m-md-5 mt-0  ">
                <Nav>
                  <Nav.ItemLink disabled href="/">
                    Flora Details
                  </Nav.ItemLink>
                  {this.state.auth.isAuthorized === true
                    ? authLinks
                    : guestLinks}
                </Nav>

                <Modal
                  visible={this.state.regModal}
                  onClickBackdrop={this.toggleRegModal}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">Register</h5>
                  </div>
                  <div className="modal-body">
                    <Alert>
                      {this.state.error.id === "REGISTER_FAIL" ||
                      this.state.error.id === "LOGIN_FAIL" ? (
                        <p>{this.state.error.msg.msg}</p>
                      ) : (
                        <></>
                      )}
                    </Alert>
                    <Form>
                      <Form.Group>
                        <label htmlFor="regName">Name</label>
                        <Form.Input
                          type="text"
                          id="regName"
                          name="regName"
                          placeholder="Enter name"
                          value={this.state.regName}
                          onChange={this.onChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <label htmlFor="regEmail">Email address</label>
                        <Form.Input
                          type="email"
                          id="regEmail"
                          name="regEmail"
                          value={this.state.regEmail}
                          placeholder="Enter email"
                          onChange={this.onChange}
                        />
                        <Form.Text text="muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <label htmlFor="regPass">Password</label>
                        <Form.Input
                          type="password"
                          id="regPass"
                          name="regPass"
                          placeholder="Password"
                          value={this.state.regPass}
                          onChange={this.onChange}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                  <div className="modal-footer">
                    <Button secondary onClick={this.toggleRegModal}>
                      Close
                    </Button>
                    <Button primary onClick={this.onRegSubmit}>
                      Register
                    </Button>
                  </div>
                </Modal>

                <Modal
                  visible={this.state.logModal}
                  onClickBackdrop={this.toggleLogModal}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">Login</h5>
                  </div>
                  <div className="modal-body">
                    <Alert>
                      {this.state.error.id === "REGISTER_FAIL" ||
                      this.state.error.id === "LOGIN_FAIL" ? (
                        <p>{this.state.error.msg.msg}</p>
                      ) : (
                        <></>
                      )}
                    </Alert>
                    <Form>
                      <Form.Group>
                        <label htmlFor="logEmail">Email address</label>
                        <Form.Input
                          type="email"
                          id="logEmail"
                          name="logEmail"
                          placeholder="Enter email"
                          value={this.state.logEmail}
                          onChange={this.onChange}
                        />
                        <Form.Text text="muted">
                          We'll never share your email with anyone else.
                        </Form.Text>
                      </Form.Group>
                      <Form.Group>
                        <label htmlFor="logPass">Password</label>
                        <Form.Input
                          type="password"
                          id="logPass"
                          name="logPass"
                          placeholder="Password"
                          value={this.state.logPass}
                          onChange={this.onChange}
                        />
                      </Form.Group>
                    </Form>
                  </div>
                  <div className="modal-footer">
                    <Button secondary onClick={this.toggleLogModal}>
                      Close
                    </Button>
                    <Button primary onClick={this.userLogin.bind(this)}>
                      Login
                    </Button>
                  </div>
                </Modal>

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

                {this.state.auth.isAuthorized === true
                  ? personalTables
                  : publicTables}

                {footer}
              </Container>
            </>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

export default App;
