import React, { useEffect, useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
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

import { useDispatch, useSelector } from "react-redux";
import {setAuthAction} from '../../store/Auth/actionCreators'
import style from "./Login.css";
 import {
  BrowserRouter as Router,Redirect, 
  Link,
  Route,
  useParams,useHistory
} from "react-router-dom";



function Register() {
  const [auth, setAuth] = useState("");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  // const [auth, setAuth] = useState({
  //   token: localStorage.getItem("token"),
  //   isAuthorized: null,
  //   isLoading: false,
  //   user: null,
  // });
  const [error, setError] = useState({
    msg: null,
    status: null,
    id: null,
  });

  const dispatch = useDispatch();
  const authRedux = useSelector(state => state.auth);

  const onRegSubmit = (e) => {
    e.preventDefault();
    console.log(regName);
    const config = tokenConfig();
    const body = JSON.stringify({ name: regName, email: regEmail, password: regPass });
    console.log(body);
    axios
      .post("api/users", body, config)
      .then((res) => {
        registerSuccess(res.data);
      })
      .catch((err) => {
          console.log('erdr')
          console.log(err);
        updateError(err, "REGISTER_FAIL");
      });
  };

  const registerSuccess = (res) => {
    let authUpdate = {
      token: res.token,
      isAuthorized: true,
      isLoading: false,
      user: res.user,
    };
    console.log(authUpdate);
    localStorage.setItem("token", res.token);
    dispatch(setAuthAction(authUpdate))

   // setAuth(authUpdate); 
    //console.log(auth);
    clearErrors();
  
   

      //const history = useHistory();
    
      setLoggedIn(true);
      
     
    //  loadItems();
    //  clearSearchBarTable();
   // toggleRegModal();
    // searchBarElement.current.handleClearButtonClick();
  };

  const clearErrors = () => {
    let errorUpdate = {
      msg: null,
      status: null,
      id: null,
    };
    setError(errorUpdate);
   };
   
   const clearAuth = () => {
    localStorage.removeItem("token");
    let authUpdate = {
      token: localStorage.getItem("token"),
      isAuthorized: null,
      isLoading: false,
      user: null,
    };
    setAuth(authUpdate);
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


  return (
    <>          
    {loggedIn ?   <Redirect to="/" /> : null}
    {JSON.stringify(authRedux)}
        <div className="Form">
          <Form>
            <Form.Group>
              <label htmlFor="regName">Name</label>
              <Form.Input
                type="text"
                id="regName"
                name="regName"
                placeholder="Enter name"
                value={regName}
                onChange={(e) => {
                  setRegName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group>
              <label htmlFor="regEmail">Email address</label>
              <Form.Input
                type="email"
                id="regEmail"
                name="regEmail"
                value={regEmail}
                placeholder="Enter email"
                onChange={(e) => {
                  setRegEmail(e.target.value);
                }}
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
                value={regPass}
                onChange={(e) => {
                  setRegPass(e.target.value);
                }}
              />
            </Form.Group>
            <Button primary onClick={onRegSubmit}>
              Register
            </Button>
          </Form>
        </div>
     
    </>
  );
}

export default Register;
