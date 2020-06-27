import ReactGA from "react-ga";
import React, { Component } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import PlantTable from "./components/PlantTable/PlantTable";
import { filterArr, randomize, modifyResult } from "./helper.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

import items from "./items.js";

import zxcvbn from "zxcvbn";

import axios from "axios";
import {
  Nav,
  Form,
  ItemLink,
  Container,
  Display4,
  Row,
  Button,
  Alert
} from "bootstrap-4-react";
import Modal from "react-bootstrap4-modal";

import style from "./App.css";

class App extends Component {
  // initialize our state
  constructor(props) {
    super(props);
    this.searchBarElement = React.createRef();

    this.state = {
      finalPublicTableCheck: false,
      showRestLoader: false,
      finalFetchedCheck: false,
      finalCheck: false,
      passStrength: 0,
      regName: "",
      regEmail: "",
      regPass: "",
      regMsg: null,
      regModal: false,
      resetModal: false,
      resetPasswordEmailSent: false,
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
      limitItems: [
        { pageNumber: 0, rowItems: 5 },
        { pageNumber: 0, rowItems: 10 },
        { pageNumber: 0, rowItems: 10 }
      ],
      error: {
        msg: null,
        status: null,
        id: null
      },
      passError: {
        msg: null,
        status: null,
        id: null
      },
      auth: {
        token: localStorage.getItem("token"),
        isAuthorized: null,
        isLoading: false,
        user: null
      },
      file: null,
      editImage: false,
      uploadMessage: null,
      editImageLoading: false
    };
  }

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
    ReactGA.initialize("UA-147525205-1");
    ReactGA.pageview(window.location.pathname + window.location.search);

    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 500);
      this.setState({ intervalIsSet: interval });
    }
    this.loadUser();
    this.loadItems();
    if (this.props.query && this.props.query.includes("token")) {
      // let resetToken = this.props.query.split(/- (.+)?/, 2);

      let i = this.props.query.indexOf("-");
      const resetToken = this.props.query.slice(i + 1);

      this.setState({ resetModal: true, resetToken: resetToken }, () => {
        this.clearErrors();
      });
    }
  }

  loadItems = () => {
    const filteredResults = filterArr(items);
    const modifiedResults = modifyResult(filteredResults);
    const randomResults = randomize(modifiedResults);
    this.setState({
      fetchedResults: [...randomResults],
      finalFetchedCheck: true
    });
  };

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
      })
      .catch(() => {
        this.setState({ fetch: true });
      });
  };

  // Being passed to SearchBar
  changeFetchedResults = result => {
    var modifiedResult = modifyResult(result);
    this.setState({ fetchedResults: modifiedResult, finalFetchedCheck: true });
  };

  findUtility(utility) {
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
    return item;
  }
  itemChange(num, place, utility, totalRows) {
    let item = this.findUtility(utility);
    let tempLimitItems = [...this.state.limitItems];
    if (num === "L") {
      tempLimitItems[item].pageNumber =
        tempLimitItems[item].pageNumber - 1 < 0
          ? totalRows - 1
          : tempLimitItems[item].pageNumber - 1;
    } else if (num === "R") {
      tempLimitItems[item].pageNumber =
        tempLimitItems[item].pageNumber + 1 > totalRows - 1
          ? 0
          : tempLimitItems[item].pageNumber + 1;
    } else {
      tempLimitItems[item].pageNumber = num;
    }

    this.setState({ limitItems: tempLimitItems });
  }
  clearTablePage = () => {
    let tempLimitItems = [...this.state.limitItems];
    tempLimitItems[0].pageNumber = 0;
  };

  rowItemChange(place, utility, value) {
    let item = this.findUtility(utility);
    let tempLimitItems = [...this.state.limitItems];
    tempLimitItems[item].rowItems = value.value;
    tempLimitItems[item].pageNumber = 0;

    this.setState({ limitItems: tempLimitItems });
  }

  sortToggle(column, utility) {
    let item = this.findUtility(utility);
    let updatedSort = [...this.state.sort];
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
    //  this.loadItems();
    //  this.clearSearchBarTable();
    this.toggleRegModal();
    // this.searchBarElement.current.handleClearButtonClick();
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
    if (this.state.resetToken) {
      window.location.replace("http://floradetails.com/");
    }

    // this.loadItems();
    //this.clearSearchBarTable();
    this.toggleLogModal();
    // this.searchBarElement.current.handleClearButtonClick();
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
    axios
      .get("api/auth/user", config)
      .then(res => {
        this.userLoaded(res);
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

  updatePassError = (err, id) => {
    if (err && err.response) {
      let passErrorUpdate = {
        msg: err.response.data,
        status: err.response.status,
        id: id
      };
      this.setState({ passError: passErrorUpdate });
    }
  };

  clearPassError = () => {
    let passErrorUpdate = {
      msg: null,
      status: null,
      id: null
    };
    this.setState({ passError: passErrorUpdate });
  };
  updateError = (err, id) => {
    if (err.response) {
      this.clearAuth();
      let errorUpdate = {
        msg: err.response.data,
        status: err.response.status,
        id: id
      };
      this.setState({ error: errorUpdate });
    }
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
    // this.clearSearchBarTable();
    //  this.loadItems();
    // this.searchBarElement.current.handleClearButtonClick();
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

  resetTokenConfig = () => {
    const token = this.state.resetToken;

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

  handlePassReset = () => {
    this.setState({ resetPassword: true }, () => {
      this.clearErrors();
    });
  };

  //function to send reset email
  handlePassResetEmailSubmit = () => {
    this.setState({ showResetLoader: true }, () => {
      let email = this.state.passReset;
      const config = this.tokenConfig();
      const body = JSON.stringify({ email });
      axios
        .post("api/reset", body, config)
        .then(res => {
          this.handleResetEmailSentSuccess(res.data);
        })
        .catch(err => {
          this.updateError(err, "RESET_FAIL");
        })
        .finally(() => {
          this.setState({ showResetLoader: false });
        });
    });
  };

  // reset email success
  handleResetEmailSentSuccess = res => {
    this.setState({ resetPasswordEmailSent: true });
    this.clearPassError();
    //enter code to remove state for showing reset here
  };

  toggleRegModal = () => {
    this.setState({ regName: "", regEmail: "", regPass: "" });
    this.setState({ regModal: !this.state.regModal });
    this.clearErrors();
  };

  toggleResetModal = () => {
    if (this.state.resetModal === true) {
      this.setState({ resetModal: !this.state.resetModal }, () => {
        this.clearPassError();
        window.location.replace("http://floradetails.com/");
      });
    }
    this.setState({ resetModal: !this.state.resetModal });
  };

  // new password submit
  onResetSubmit = () => {
    let password = this.state.resetPass;
    const config = this.resetTokenConfig();
    const body = JSON.stringify({ password });
    this.clearPassError();
    axios
      .post("api/passReset", body, config)
      .then(res => {
        this.handlePassResetSuccess(res.data);
      })
      .catch(err => {
        this.updatePassError(err, "RESET_FAIL_FINAL");
      });
  };
  handlePassResetSuccess = res => {
    this.setState({ passResetSuccess: true });
  };
  handlePassResetSuccessLogin = () => {
    this.setState({ passResetSuccess: false });
    this.toggleResetModal();
    this.toggleLogModal();
    this.clearPassError();
  };

  toggleLogModal = () => {
    this.setState({ logName: "", logEmail: "", logPass: "" });
    this.setState({ logModal: !this.state.logModal, resetPassword: false });
    this.clearErrors();
    this.setState({ resetPasswordEmailSent: false });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onRegSubmit = e => {
    e.preventDefault();
    this.userRegister();
  };

  handleProfilePic = () => {
    this.setState({ editImage: true });
  };

  submitFile = event => {
    this.setState({ editImageLoading: true });
    const token = this.state.auth.token;
    const userEmail = this.state.auth.email;
    event.preventDefault();
    const formData = new FormData();
    if (this.state.file && this.state.file[0]) {
      formData.append("file", this.state.file[0]);
      console.log(typeof formData);
      console.log("got");
      axios
        .post(`/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token
          },
          userEmail
        })
        .then(response => {
          // handle your response;
          this.cancelUpload();
          this.loadUser();
        })
        .catch(error => {
          // handle your error
          this.setState({ uploadMessage: "Please choose a valid image file" });
        })
        .finally(() => {
          this.setState({ editImageLoading: false });
        });
    } else {
      this.setState({
        uploadMessage: "Please choose a file",
        editImageLoading: false
      });
    }
  };

  cancelUpload = () => {
    this.setState({ editImage: false, uploadMessage: null });
  };
  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    if (this.state.auth.user) {
      console.log(this.state.auth.user);
    }
    const authLinks = (
      <>
        <Nav.ItemLink active href="#" onClick={this.logout.bind(this)}>
          <em>Logout</em>
        </Nav.ItemLink>
      </>
    );
    const guestLinks = (
      <>
        <Nav.ItemLink onClick={this.toggleRegModal} active href="#">
          <em> Register</em>
        </Nav.ItemLink>
        <Nav.ItemLink onClick={this.toggleLogModal} href="#">
          <em>Login</em>
        </Nav.ItemLink>
      </>
    );

    const { data } = this.state;

    const addedItems = this.state.auth.user
      ? this.state.auth.user.items
        ? this.state.auth.user.items
        : null
      : this.state.data;

    const publicTables = (
      <>
        {this.state.finalPublicTableCheck ? (
          <>
            {data.length > 0 ? (
              <>
                <Display4 className={`mt-3 width-check`}>
                  Public's Table.{" "}
                  <a onClick={this.toggleRegModal} href="#">
                    Register
                  </a>{" "}
                  or{" "}
                  <a onClick={this.toggleLogModal} href="#">
                    Login
                  </a>{" "}
                  to Manage Your Personal Table
                </Display4>

                <PlantTable
                  tableData={data}
                  handleAddorDelete={this.handleDelete.bind(this)}
                  sortToggle={this.sortToggle.bind(this)}
                  sortColumn={this.state.sort[1].sortColumn}
                  sortDirection={this.state.sort[1].sortDirection}
                  limitItems={this.state.limitItems[1]}
                  itemChange={this.itemChange.bind(this)}
                  rowItemChange={this.rowItemChange.bind(this)}
                  utility="Delete"
                />
              </>
            ) : (
              <>
                <Display4 className={`mt-3 width-check`}>
                  Public's Table is Empty, Use Search Results to Add Plants{" "}
                </Display4>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </>
    );

    const footer = (
      <>
        <p className={`mt-0 pb-0 mb-0 pr-1 width-check`}>
          <em>
            {" "}
            This web-app is developed by{" "}
            <a target="_blank" href="http://www.iamsharma.com">
              iamSharma
            </a>{" "}
            using the MERN stack (MongoDB, Express JS, React JS, Node JS). User
            authentication is implemented with JSON Web Tokens and Bcrypt JS,
            and password reset emails are sent through NodeMailer. Checkout its
            source code on GitHub:{" "}
            <a target="_blank" href="https://github.com/oosharma/FloraDetails">
              https://github.com/oosharma/FloraDetails
            </a>
          </em>
        </p>
      </>
    );

    const personalTables = (
      <>
        {this.state.auth.user && this.state.auth.user.items ? (
          <>
            {this.state.auth.user.items.length > 0 ? (
              <>
                <Display4 className={`mt-3 width-check`}>
                  {this.state.auth.user.name}'s Personal Table
                </Display4>

                <PlantTable
                  tableData={this.state.auth.user.items}
                  sortToggle={this.sortToggle.bind(this)}
                  sortColumn={this.state.sort[2].sortColumn}
                  sortDirection={this.state.sort[2].sortDirection}
                  limitItems={this.state.limitItems[2]}
                  itemChange={this.itemChange.bind(this)}
                  rowItemChange={this.rowItemChange.bind(this)}
                  handleAddorDelete={this.deletePersonalItem.bind(this)}
                  utility="Personal Delete"
                ></PlantTable>
              </>
            ) : (
              <>
                <Display4 className={`mt-3 width-check`}>
                  {this.state.auth.user.name}'s Personal Table is Empty, Use
                  Search Table to Add Plants
                </Display4>
              </>
            )}
          </>
        ) : (
          <>
            {this.state.auth.user ? (
              <>
                <Display4 className="mt-3 width-check">
                  {this.state.auth.user.name}'s Personal Table is Empty, Use
                  Search Results to Add Plants
                </Display4>
              </>
            ) : (
              <></>
            )}
          </>
        )}
      </>
    );

    return (
      <>
        {this.state.finalCheck &&
        this.state.finalPublicTableCheck &&
        this.state.finalFetchedCheck ? (
          <>
            <>
              <Container className="p-sm-4 pl-md-3 ml-lg-5 m-xs-4 mt2  p-4 ">
                <Nav>
                  <Nav.ItemLink className="pl-0" disabled href="/">
                    <em>Flora Details</em>
                  </Nav.ItemLink>
                  {this.state.auth.isAuthorized === true
                    ? authLinks
                    : guestLinks}
                </Nav>

                <Modal
                  visible={this.state.resetModal}
                  onClickBackdrop={this.toggleResetModal}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">Reset Password</h5>
                  </div>
                  <div className="modal-body">
                    {this.state.passError && this.state.passError.msg && (
                      <>
                        {this.state.passError.id === "RESET_FAIL_FINAL" ? (
                          <Alert danger>
                            {" "}
                            <p>{this.state.passError.msg.msg}</p>{" "}
                          </Alert>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                    {this.state.passResetSuccess ? (
                      <>
                        <Alert primary>
                          {" "}
                          <p>Password successfully reset</p>{" "}
                        </Alert>
                        {/* <a onClick={this.handlePassResetSuccessLogin} href="#">
                          Login
                        </a>{" "} */}
                      </>
                    ) : (
                      <>
                        <Form>
                          <Form.Group>
                            <label htmlFor="resetPass">Password</label>
                            <Form.Input
                              type="password"
                              id="resetPass"
                              name="resetPass"
                              placeholder="Password"
                              value={this.state.resetPass}
                              onChange={this.onChange}
                            />
                          </Form.Group>
                          <Form.Group className="empty-form-group">
                            <label htmlFor="resetPass">N/A</label>
                            <Form.Input />
                          </Form.Group>
                        </Form>
                      </>
                    )}
                  </div>
                  <div className="modal-footer">
                    <Button secondary onClick={this.toggleResetModal}>
                      Close
                    </Button>
                    {this.state.passResetSuccess ? (
                      <></>
                    ) : (
                      <>
                        <Button primary onClick={this.onResetSubmit}>
                          Submit
                        </Button>
                      </>
                    )}
                  </div>
                </Modal>

                <Modal
                  visible={this.state.regModal}
                  onClickBackdrop={this.toggleRegModal}
                >
                  <div className="modal-header">
                    <h5 className="modal-title">Register</h5>
                  </div>
                  <div className="modal-body">
                    {this.state.error.msg && this.state.error.msg.msg && (
                      <Alert danger>
                        {this.state.error.id === "REGISTER_FAIL" ||
                        this.state.error.id === "LOGIN_FAIL" ? (
                          <p>{this.state.error.msg.msg}</p>
                        ) : (
                          <></>
                        )}
                      </Alert>
                    )}
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
                  {this.state.resetPassword ? (
                    <>
                      <>
                        <div className="modal-header">
                          <h5 className="modal-title">Reset Password</h5>
                        </div>
                        {this.state.resetPasswordEmailSent ? (
                          <>
                            <div className="modal-body">
                              <Alert success>
                                <p>Rest link sent to your email</p>
                              </Alert>
                            </div>
                            <div className="modal-footer">
                              <Button secondary onClick={this.toggleLogModal}>
                                Close
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="modal-body">
                              {this.state.error.msg &&
                                this.state.error.msg.msg && (
                                  <Alert danger>
                                    {this.state.error.id === "RESET_FAIL" ? (
                                      <p>{this.state.error.msg.msg}</p>
                                    ) : (
                                      <></>
                                    )}
                                  </Alert>
                                )}
                              <Form>
                                <Form.Group>
                                  <label htmlFor="logEmail">
                                    Email address
                                  </label>
                                  <Form.Input
                                    type="email"
                                    id="passReset"
                                    name="passReset"
                                    placeholder="Enter email"
                                    value={this.state.passReset}
                                    onChange={this.onChange}
                                  />
                                </Form.Group>
                              </Form>
                            </div>
                            <div className="modal-footer">
                              <Button secondary onClick={this.toggleLogModal}>
                                Close
                              </Button>
                              {this.state.showResetLoader ? (
                                <>
                                  <Button primary className="loader-button">
                                    <Loader
                                      type="Puff"
                                      color="#00BFFF"
                                      height={25}
                                      width={25}
                                      // timeout={1000} //3 secs
                                    />{" "}
                                  </Button>
                                </>
                              ) : (
                                <>
                                  <Button
                                    primary
                                    onClick={this.handlePassResetEmailSubmit.bind(
                                      this
                                    )}
                                  >
                                    Send Email
                                  </Button>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </>
                    </>
                  ) : (
                    <>
                      <div className="modal-header">
                        <h5 className="modal-title">Login</h5>
                      </div>
                      <div className="modal-body">
                        {this.state.error.msg && this.state.error.msg.msg && (
                          <Alert danger>
                            {this.state.error.id === "REGISTER_FAIL" ||
                            this.state.error.id === "LOGIN_FAIL" ? (
                              <p>{this.state.error.msg.msg}</p>
                            ) : (
                              <></>
                            )}
                          </Alert>
                        )}
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
                        <a onClick={this.handlePassReset} href="#">
                          Reset Password
                        </a>{" "}
                      </div>
                      <div className="modal-footer">
                        <Button secondary onClick={this.toggleLogModal}>
                          Close
                        </Button>
                        <Button primary onClick={this.userLogin.bind(this)}>
                          Login
                        </Button>
                      </div>
                    </>
                  )}
                </Modal>
                {this.state.auth.user ? (
                  <>
                    <>
                      <div className="profile-pic-div">
                        <img
                          title="edit image"
                          alt="not available"
                          onError={() => {
                            console.log("errrrrrrrr");
                          }}
                          class={`pic-img`}
                          onClick={this.handleProfilePic}
                          src={
                            this.state.auth.user.profile_pic
                              ? `https://flora-details-profile-pics.s3-us-west-1.amazonaws.com/${this.state.auth.user.pic_uri}`
                              : `https://flora-details-profile-pics.s3-us-west-1.amazonaws.com/generic-dp.jpg`
                          }
                        ></img>
                      </div>

                      {this.state.editImage && (
                        <>
                          {" "}
                          <>
                            <div className={`editImage`}>
                              {this.state.uploadMessage && (
                                <p className={`mt-1 mb-1 editImageWarning`}>
                                  {this.state.uploadMessage}
                                </p>
                              )}
                              <form
                                class={`mt-1 mb-1`}
                                onSubmit={this.submitFile}
                              >
                                <input
                                  class={`imageInput`}
                                  label="upload file"
                                  type="file"
                                  onChange={this.handleFileUpload}
                                />
                                {this.state.editImageLoading ? (
                                  <>
                                    <Button primary className="loader-button">
                                      <Loader
                                        type="Puff"
                                        color="#00BFFF"
                                        height={25}
                                        width={25}
                                        // timeout={1000} //3 secs
                                      />{" "}
                                    </Button>
                                  </>
                                ) : (
                                  <>
                                    <Button
                                      className={`btn btn-primary imageInputBtn`}
                                      type="submit"
                                    >
                                      Upload
                                    </Button>
                                  </>
                                )}

                                <Button
                                  className={`btn btn-secondary imageInputBtn ml-3`}
                                  onClick={this.cancelUpload}
                                >
                                  Cancel
                                </Button>
                              </form>
                            </div>
                          </>
                        </>
                      )}
                      <p className="mb-0 mt-1 width-check">
                        <em> Welcome {this.state.auth.user.name},</em>
                      </p>
                    </>
                  </>
                ) : null}

                <SearchBar
                  ref={this.searchBarElement}
                  tableItems={this.state.fetchedResults}
                  changeFetchedResults={this.changeFetchedResults.bind(this)}
                  clearTablePage={this.clearTablePage.bind(this)}
                />
                {this.state.fetchedResults && (
                  <PlantTable
                    addedItems={addedItems}
                    tableData={this.state.fetchedResults}
                    sortToggle={this.sortToggle.bind(this)}
                    sortColumn={this.state.sort[0].sortColumn}
                    sortDirection={this.state.sort[0].sortDirection}
                    limitItems={this.state.limitItems[0]}
                    itemChange={this.itemChange.bind(this)}
                    rowItemChange={this.rowItemChange.bind(this)}
                    handleAddorDelete={this.changeAddItem.bind(
                      this,
                      this.state.auth.isAuthorized
                    )}
                    utility="Add"
                  />
                )}

                {this.state.auth.isAuthorized === true
                  ? personalTables
                  : publicTables}

                {footer}
                {/* {secondFooter} */}
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
