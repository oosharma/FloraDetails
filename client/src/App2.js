import ReactGA from "react-ga";
import React, { Component, useEffect, useState } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import Filters from "./components/Filters/Filters";
import PlantTable from "./components/PlantTable/PlantTable";
import { filterArr, randomize, modifyResult } from "./helper.js";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { allPlantData } from "./constants/data";

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
  Alert,
} from "bootstrap-4-react";
import Modal from "react-bootstrap4-modal";
import {
  BrowserRouter as Router,
  Redirect,
  Link,
  Route,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthAction } from "./store/Auth/actionCreators";

import style from "./App2.css";

function App2({ query }) {
  const [regName, setRegName] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [passReset, setPassReset] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPass, setLogPass] = useState("");

  const [resetPass, setResetPass] = useState("");
  const [resetPassword, setResetPassword] = useState(false);
  const [passResetSuccess, setPassResetSuccess] = useState(false);
  const [logModal, setLogModal] = useState("");
  const [logName, setLogName] = useState("");

  const [fetchedResults, setFetchedResults] = useState([]);
  const [resetToken, setResetToken] = useState("");
  const [finalPublicTableCheck, setFinalPublicTableCheck] = useState(false);
  const [showResetLoader, setShowResetLoader] = useState(false);
  const [finalFetchedCheck, setFinalFetchedCheck] = useState(false);
  const [finalCheck, setFinalCheck] = useState(false);
  const [passStrength, setPassStrength] = useState(0);

  const [regMsg, setRegMsg] = useState(null);
  const [regModal, setRegModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState(false);

  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [commonName, setCommonName] = useState(null);
  const [bloomTime, setBloomTime] = useState(null);
  const [plantType, setPlantType] = useState(null);
  const [appropriateLocation, setAppropriateLocation] = useState(null);
  const [waterNeeds, setWaterNeeds] = useState(null);
  const [sizeAtMaturity, setSizeAtMaturity] = useState(null);
  const [suitableSiteConditions, setSuitableSiteConditions] = useState(null);
  const [intervalIsSet, setIntervalIsSet] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);
  const [idToUpdate, setIdToUpdate] = useState(null);
  const [objectToUpdate, setObjectToUpdate] = useState(null);
  const [addItem, setAddItem] = useState({});
  const [addName, setAddName] = useState("");
  const [addbloomTime, setAddbloomTime] = useState("");
  const [addplantType, setAddplantType] = useState("");
  const [addappropriateLocation, setAddappropriateLocation] = useState("");
  const [addwaterNeeds, setAddwaterNeeds] = useState("");
  const [addsizeAtMaturity, setAddsizeAtMaturity] = useState("");
  const [addsuitableSiteConditions, setAddsuitableSiteConditions] =
    useState("");
  const [emptyDB, setEmptyDB] = useState(0);
  const [showPinned, setShowPinned] = useState(true);
  const [deleteBtnVariant, setDeleteBtnVariant] = useState();
  const [deleteBtnClass, setDeleteBtnClass] = useState();
  const [fetch, setFetch] = useState(true);

  const [test, setTest] = useState(null);
  const [upLoadMessage, setUploadMessage] = useState("");

  const [sort, setSort] = useState([
    { sortDirection: "none", sortColumn: "none" },
    { sortDirection: "none", sortColumn: "none" },
    { sortDirection: "none", sortColumn: "none" },
    { sortDirection: "none", sortColumn: "none" },
  ]);
  const [limitItems, setLimitItems] = useState([
    { pageNumber: 0, rowItems: 5 },
    { pageNumber: 0, rowItems: 10 },
    { pageNumber: 0, rowItems: 10 },
  ]);
  const [error, setError] = useState({
    msg: null,
    status: null,
    id: null,
  });
  const [passError, setPassError] = useState({
    msg: null,
    status: null,
    id: null,
  });
  // const [auth, setAuth] = useState({
  //   token: localStorage.getItem("token"),
  //   isAuthorized: null,
  //   isLoading: false,
  //   user: null,
  // });
  const [file, setFile] = useState(null);
  const [editImage, setEditImage] = useState(false);
  const [uploadMessage, setupLoadMessage] = useState(null);
  const [editImageLoading, setEditImageLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const filterOptions = useSelector((state) => state.filters);

  React.useEffect(() => {
    // console.log(1111, filterOptions);
    const filteredResults = filterArr(items);
    const modifiedResults = modifyResult(filteredResults);
    //   console.log(1111, modifiedResults);
    const finalArr = [];
    let res = [...modifiedResults];
    //  console.log(1111, res);

    for (let item in filterOptions) {
      if (filterOptions[item] === "null") {
        continue;
      }
      res = [...res.filter((ele) => {
        console.log(ele[item]);
        console.log(ele);
        return ele[item] ?.includes(filterOptions[item]);
      })];
    }
    // if (filterOptions.filterOptions.length > 0) {

    //   console.log('here')
    //   //   let prev = filterOptions.filterOptions[0].split(":")[0];
    //   let [key, value] = filterOptions.filterOptions[0].split(":");
    //   let prev = key;
    //   res = [...res.filter((item) => {
    //     console.log(item);
    //     return item[key] === value;
    //   })];
    //   console.log(key)
    //   console.log(value)
    //   for (let i = 1; i < filterOptions.filterOptions.length; i++) {
    //     let startingItems = [...res];
    //     let [key, value] = filterOptions.filterOptions[i].split(":");
    //     // if (key === prev) {
    //     res = [...startingItems, ...modifiedResults.filter((element) => {

    //       return element[key] === value;
    //     })]

    //     console.log(1111, modifiedResults.filter((element) => {

    //       return element[key] === value;
    //     }));
    //     // } else {
    //     //   res = [...startingItems,...startingItems.filter((element) => {

    //     //     return element[key] === value;
    //     //   })]

    //   }
    //   prev = key;
    //   // console.log(item);

    //   // console.log(key);
    //   // console.log(value);

    //   //finalArr.push(...res);

    //   // console.log(finalArr);



    // }
    console.log(1111, res);
    setFetchedResults([...res]);

  }, [filterOptions]);

  const searchBarElement = React.createRef();

  const changeAddItem = (isAuthorized, result) => {
    // var modifiedResult = modifyResult(result);

    if (isAuthorized) {
      addPersonalItem(result);
    } else {
      let addItem = JSON.parse(JSON.stringify(result));
      setAddItem(addItem);
      addToPulicDB(addItem);
    }
    loadItems();
  };

  const addPersonalItem = (result) => {
    let postFlag = true;
    if (auth.user && auth.user.items && auth.user.items.length > 0) {
      let dataSet = new Set();
      auth.user.items.forEach((arrayItem) => {
        dataSet.add(arrayItem.commonName);
      });
      if (dataSet.has(result.commonName)) {
        window.alert("item already in pinned section");
        postFlag = false;
      }
    }
    if (postFlag) {
      let config = tokenConfig();
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
      //  const config = tokenConfig();
      //  const body = JSON.stringify({ name, email, password });
      const updatedObj = {
        commonName,
        bloomTime,
        plantType,
        appropriateLocation,
        waterNeeds,
        sizeAtMaturity,
        suitableSiteConditions,
      };
      let updateRow = [updatedObj];

      let updateItem =
        auth.user && auth.user.items
          ? [...updateRow, ...auth.user.items]
          : updateRow;

      const body = {
        filter: { email: auth.user.email },
        update: { items: updateItem },
      };
      axios.post("api/userItem", body, config).then((res) => {
        loadUser();
      });
    }
  };

  const addToPulicDB = (addItem) => {
    let commonName = addItem.commonName;
    let currentIds = data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }
    var dataSet = new Set();
    data.forEach((arrayItem) => {
      dataSet.add(arrayItem.commonName);
    });
    if (dataSet.has(commonName)) {
      window.alert("item already in pinned section");
    } else {
      axios
        .post("/api/items", {
          id: idToBeAdded,
          commonName: addItem.commonName,
          bloomTime: addItem.bloomTime,
          plantType: addItem.plantType,
          appropriateLocation: addItem.appropriateLocation,
          waterNeeds: addItem.waterNeeds,
          sizeAtMaturity: addItem.sizeAtMaturity,
          suitableSiteConditions: addItem.suitableSiteConditions,
        })
        .then((res) => {
          setFetch(true);
        })
        .catch((err) => {
          setFetch(true);
        });
    }
  };

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  useEffect(() => {
    ReactGA.initialize("UA-147525205-1");
    ReactGA.pageview(window.location.pathname + window.location.search);

    getDataFromDb();
    if (!intervalIsSet) {
      let interval = setInterval(getDataFromDb, 500);
      setIntervalIsSet(interval);
    }
    loadUser();
    loadItems();
    if (query && query.includes("token")) {
      // let resetToken = props.query.split(/- (.+)?/, 2);

      let i = query.indexOf("-");

      setResetModal(true);
      setResetToken(query.slice(i + 1));
      clearErrors();
    }
  }, []);

  const loadItems = () => {
    const filteredResults = filterArr(items);
    const modifiedResults = modifyResult(filteredResults);
    const randomResults = randomize(modifiedResults);
    setFetchedResults([...randomResults]);
    setFinalFetchedCheck(true);
  };

  // never let a process live forever
  // always kill a process everytime we are done using it
  // componentWillUnmount() {
  //   if (intervalIsSet) {
  //     clearInterval(intervalIsSet);
  //     setState({ intervalIsSet: null });
  //   }
  // }

  // our first get method that uses our backend api to
  // fetch data from our data base
  const getDataFromDb = () => {
    if (fetch) {
      axios
        .get("/api/items")
        .then((res) => {
          setData(res.data);
          setFetch(false);
        })
        .finally(() => {
          setFinalPublicTableCheck(true);
        });
    }
  };

  const deletePersonalItem = (result) => {
    //  const config = tokenConfig();
    //  const body = JSON.stringify({ name, email, password });
    let config = tokenConfig();

    let updateItem = auth.user.items.filter((item) => {
      return item.commonName != result.commonName;
    });

    const body = {
      filter: { email: auth.user.email },
      update: { items: updateItem },
    };
    axios.post("api/userItem", body, config).then((res) => {
      loadUser();
    });
  };

  const handleDelete = (result) => {
    setIdToDelete(result._id);
    deleteFromDB(result._id);
  };

  const deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);

    let objIdToDelete = null;
    data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });
    axios
      .delete(`/api/items/${idTodelete}`)
      .then(() => {
        setFetch(true);
      })
      .catch(() => {
        setFetch(true);
      });
  };

  // Being passed to SearchBar
  const changeFetchedResults = (result) => {
    var modifiedResult = modifyResult(result);
    setFetchedResults(modifiedResult);
    setFinalFetchedCheck(true);
  };

  function findUtility(utility) {
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

  function itemChange(num, place, utility, totalRows) {
    let item = findUtility(utility);
    let tempLimitItems = [...limitItems];
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
    setLimitItems(tempLimitItems);
  }
  const clearTablePage = () => {
    let tempLimitItems = [...limitItems];
    tempLimitItems[0].pageNumber = 0;
  };

  function rowItemChange(place, utility, value) {
    let item = findUtility(utility);
    let tempLimitItems = [...limitItems];
    tempLimitItems[item].rowItems = value.value;
    tempLimitItems[item].pageNumber = 0;
    setLimitItems(tempLimitItems);
  }

  function sortToggle(column, utility) {
    let item = findUtility(utility);
    let updatedSort = [...sort];
    updatedSort[item].sortColumn = column;

    // toggle sort direction
    if (
      sort[item].sortDirection === "none" ||
      sort[item].sortDirection === "descending"
    ) {
      updatedSort[item].sortDirection = "ascending";
    } else {
      updatedSort[item].sortDirection = "descending";
    }
    setSort(updatedSort);
  }

  const userLogin = () => {
    let email = logEmail;
    let password = logPass;
    const config = tokenConfig();
    const body = JSON.stringify({ email, password });
    axios
      .post("api/auth", body, config)
      .then((res) => {
        loginSuccess(res.data);
      })
      .catch((err) => {
        updateError(err, "LOGIN_FAIL");
      });
  };

  const registerSuccess = (res) => {
    let authUpdate = {
      token: res.token,
      isAuthorized: true,
      isLoading: false,
      user: res.user,
    };
    localStorage.setItem("token", res.token);
    // setAuth(authUpdate);
    dispatch(setAuthAction(authUpdate));

    clearErrors();
    //  loadItems();
    //  clearSearchBarTable();
    toggleRegModal();
    // searchBarElement.current.handleClearButtonClick();
  };

  const loginSuccess = (res) => {
    let authUpdate = {
      token: res.token,
      isAuthorized: true,
      isLoading: false,
      user: res.user,
    };
    localStorage.setItem("token", res.token);
    //setAuth(authUpdate);
    dispatch(setAuthAction(authUpdate));

    clearErrors();
    if (resetToken) {
      window.location.replace("http://floradetails.com/");
    }

    // loadItems();
    //clearSearchBarTable();
    toggleLogModal();
    // searchBarElement.current.handleClearButtonClick();
  };

  const clearSearchBarTable = () => {
    let emptyArray = [];
    setFetchedResults(emptyArray);
  };

  const userRegister = () => {
    let name = regName;
    let email = regEmail;
    let password = regPass;

    const config = tokenConfig();
    const body = JSON.stringify({ name, email, password });

    axios
      .post("api/users", body, config)
      .then((res) => {
        registerSuccess(res.data);
      })
      .catch((err) => {
        updateError(err, "REGISTER_FAIL");
      });
  };

  const userLoaded = (res) => {
    let authUpdate = {
      token: localStorage.getItem("token"),
      isAuthorized: true,
      isLoading: false,
      user: res.data,
    };
    dispatch(setAuthAction(authUpdate));
    //setAuth(authUpdate);

    clearErrors();
  };

  const loadUser = () => {
    let authUpdate = { ...auth, isLoading: true };
    //setAuth(authUpdate);
    dispatch(setAuthAction(authUpdate));
    const config = tokenConfig();
    axios
      .get("api/auth/user", config)
      .then((res) => {
        userLoaded(res);
      })
      .catch((err) => {
        updateError(err);
      })
      .finally(() => {
        setFinalCheck(true);
      });
  };

  const clearErrors = () => {
    let errorUpdate = {
      msg: null,
      status: null,
      id: null,
    };
    setError(errorUpdate);
  };

  const updatePassError = (err, id) => {
    if (err && err.response) {
      let passErrorUpdate = {
        msg: err.response.data,
        status: err.response.status,
        id: id,
      };
      setPassError(passErrorUpdate);
    }
  };

  const clearPassError = () => {
    let passErrorUpdate = {
      msg: null,
      status: null,
      id: null,
    };
    setPassError(passErrorUpdate);
  };
  const updateError = (err, id) => {
    if (err.response) {
      clearAuth();
      let errorUpdate = {
        msg: err.response.data,
        status: err.response.status,
        id: id,
      };
      setError(errorUpdate);
    }
  };
  const clearAuth = () => {
    localStorage.removeItem("token");
    let authUpdate = {
      token: localStorage.getItem("token"),
      isAuthorized: null,
      isLoading: false,
      user: null,
    };
    dispatch(setAuthAction(authUpdate));
    // setAuth(authUpdate);
  };

  const logout = () => {
    clearAuth();
    // clearSearchBarTable();
    //  loadItems();
    // searchBarElement.current.handleClearButtonClick();
  };

  const tokenConfig = () => {
    // Get token from localstorage
    const token = auth.token;

    // Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // If token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  const resetTokenConfig = () => {
    const token = resetToken;

    // Headers
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    // If token, add to headers
    if (token) {
      config.headers["x-auth-token"] = token;
    }

    return config;
  };

  const handlePassReset = () => {
    setResetPassword(true);

    clearErrors();
  };

  //function to send reset email
  const handlePassResetEmailSubmit = () => {
    setShowResetLoader(true);

    let email = passReset;
    const config = tokenConfig();
    const body = JSON.stringify({ email });
    axios
      .post("api/reset", body, config)
      .then((res) => {
        handleResetEmailSentSuccess(res.data);
      })
      .catch((err) => {
        updateError(err, "RESET_FAIL");
      })
      .finally(() => {
        setShowResetLoader(false);
      });
  };

  // reset email success
  const handleResetEmailSentSuccess = (res) => {
    setResetPasswordEmailSent(true);

    clearPassError();
    //enter code to remove state for showing reset here
  };

  const toggleRegModal = () => {
    setRegName("");
    setRegEmail("");
    setRegPass("");
    setRegModal(!regModal);
    clearErrors();
  };

  const toggleResetModal = () => {
    if (resetModal === true) {
      setResetModal(!resetModal);
      clearPassError();
      window.location.replace("http://floradetails.com/");
    }
    setResetModal(!resetModal);
  };

  // new password submit
  const onResetSubmit = () => {
    let password = resetPass;
    const config = resetTokenConfig();
    const body = JSON.stringify({ password });
    clearPassError();
    axios
      .post("api/passReset", body, config)
      .then((res) => {
        handlePassResetSuccess(res.data);
      })
      .catch((err) => {
        updatePassError(err, "RESET_FAIL_FINAL");
      });
  };

  const handlePassResetSuccess = (res) => {
    setPassResetSuccess(true);
  };

  const handlePassResetSuccessLogin = () => {
    setPassResetSuccess(false);

    toggleResetModal();
    toggleLogModal();
    clearPassError();
  };

  const toggleLogModal = () => {
    setLogName("");
    setLogEmail("");
    setLogPass("");
    setLogModal(!logModal);
    setResetPassword(false);
    clearErrors();
    setResetPasswordEmailSent(false);
  };

  //  const onChange = (e) => {
  //     setState({ [e.target.name]: e.target.value });
  //   };

  const onRegSubmit = (e) => {
    e.preventDefault();
    userRegister();
  };

  const handleProfilePic = () => {
    setEditImage(true);
  };

  const submitFile = (event) => {
    setEditImageLoading(true);

    const token = auth.token;
    const userEmail = auth.email;
    event.preventDefault();
    const formData = new FormData();
    if (file && file[0]) {
      formData.append("file", file[0]);

      axios
        .post(`/api/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": token,
          },
          userEmail,
        })
        .then((response) => {
          // handle your response;
          cancelUpload();
          loadUser();
        })
        .catch((error) => {
          // handle your error
          setUploadMessage("Please choose a valid image file");
        })
        .finally(() => {
          setEditImageLoading(false);
          loadUser();
        });
    } else {
      setUploadMessage("Please choose a file");
      setEditImageLoading(false);
    }
  };

  const cancelUpload = () => {
    setEditImage(false);
    setUploadMessage(null);
  };
  const handleFileUpload = (event) => {
    setFile(event.target.files);
  };


  //  const tableData = modifyResult(allPlantData, filterOptions)
  const authLinks = (
    <>
      <a active href="#" onClick={logout}>
        <em>Logout</em>
      </a>
    </>
  );
  const guestLinks = (
    <>
      <a  > <Link to="/register">Register </Link></a>
      <a  > <Link to="/login">Login </Link></a>

    </>
  );

  // const { data } = state;

  const addedItems = auth.user
    ? auth.user.items
      ? auth.user.items
      : null
    : data;

  const publicTables = (
    <>
      {finalPublicTableCheck ? (
        <>
          {data.length > 0 ? (
            <>
              <Display4 className={`mt-3 width-check`}>
                Public's Table.{" "}
                <a onClick={toggleRegModal} href="#">
                  Register
                </a>{" "}
                or{" "}
                <a onClick={toggleLogModal} href="#">
                  Login
                </a>{" "}
                to Manage Your Personal Table
              </Display4>

              <PlantTable
                tableData={data}
                handleAddorDelete={handleDelete}
                sortToggle={sortToggle}
                sortColumn={sort[1].sortColumn}
                sortDirection={sort[1].sortDirection}
                limitItems={limitItems[1]}
                itemChange={itemChange}
                rowItemChange={rowItemChange}
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
          authentication is implemented with JSON Web Tokens and Bcrypt JS, and
          password reset emails are sent through NodeMailer. Checkout its source
          code on GitHub:{" "}
          <a target="_blank" href="https://github.com/oosharma/FloraDetails">
            https://github.com/oosharma/FloraDetails
          </a>
        </em>
      </p>
    </>
  );

  const personalTables = (
    <>
      {auth.user && auth.user.items ? (
        <>
          {auth.user.items.length > 0 ? (
            <>
              <Display4 className={`mt-3 width-check`}>
                {auth.user.name}'s Personal Table
              </Display4>

              <PlantTable
                tableData={auth.user.items}
                sortToggle={sortToggle}
                sortColumn={sort[2].sortColumn}
                sortDirection={sort[2].sortDirection}
                limitItems={limitItems[2]}
                itemChange={itemChange}
                rowItemChange={rowItemChange}
                handleAddorDelete={deletePersonalItem}
                utility="Personal Delete"
              ></PlantTable>
            </>
          ) : (
              <>
                <Display4 className={`mt-3 width-check`}>
                  {auth.user.name}'s Personal Table is Empty, Use Search Table to
                  Add Plants
              </Display4>
              </>
            )}
        </>
      ) : (
          <>
            {auth.user ? (
              <>
                <Display4 className="mt-3 width-check">
                  {auth.user.name}'s Personal Table is Empty, Use Search Results
                  to Add Plants
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
    <Container fluid className="main-Container" >

      {finalCheck && finalPublicTableCheck && finalFetchedCheck ? (
        <>
          <>

            <div className="Nav"  >
              <a className="pl-0" disabled href="/">
                <em>Flora Details</em>
              </a>
              <SearchBar
                ref={searchBarElement}
                tableItems={fetchedResults}
                changeFetchedResults={changeFetchedResults}
                clearTablePage={clearTablePage}
              />
              {auth.isAuthorized === true ? authLinks : guestLinks}
            </div>

            {auth.user ? (
              <>
                <>
                  <div className="profile-pic-div">
                    <img
                      title="edit image"
                      alt="not available"
                      // onError={() => {
                      //   console.log("errrrrrrrr");
                      // }}
                      class={`pic-img`}
                      onClick={handleProfilePic}
                      src={
                        auth.user.profile_pic
                          ? `https://flora-details-profile-pics.s3-us-west-1.amazonaws.com/${
                          auth.user.pic_uri
                          }?=${Date.now()}`
                          : `https://flora-details-profile-pics.s3-us-west-1.amazonaws.com/generic-dp.jpg`
                      }
                    ></img>
                  </div>

                  {editImage && (
                    <>
                      {" "}
                      <>
                        <div className={`editImage`}>
                          {uploadMessage && (
                            <p className={`mt-1 mb-1 editImageWarning`}>
                              {uploadMessage}
                            </p>
                          )}
                          <form class={`mt-1 mb-1`} onSubmit={submitFile}>
                            <input
                              class={`imageInput`}
                              label="upload file"
                              type="file"
                              onChange={handleFileUpload}
                            />
                            {editImageLoading ? (
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
                              onClick={cancelUpload}
                            >
                              Cancel
                              </Button>
                          </form>
                        </div>
                      </>
                    </>
                  )}

                </>
              </>
            ) : null}


            <div className="plant-area">
              <Filters />
              <div className="plant-tables">
                {fetchedResults && (
                  <PlantTable
                    addedItems={addedItems}
                    tableData={fetchedResults}
                    sortToggle={sortToggle}
                    sortColumn={sort[0].sortColumn}
                    sortDirection={sort[0].sortDirection}
                    limitItems={limitItems[0]}
                    itemChange={itemChange}
                    rowItemChange={rowItemChange}
                    handleAddorDelete={changeAddItem}
                    isAuthorized={auth.isAuthorized}
                    utility="Add"
                  />
                )}

                {/* {auth.isAuthorized === true ? personalTables : publicTables} */}
              </div>

            </div>


            {footer}
            {/* {secondFooter} */}

          </>
        </>
      ) : (
          <>Loading.....</>
        )}
    </Container>
  );
}

export default App2;
