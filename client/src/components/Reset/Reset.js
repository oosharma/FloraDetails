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
import { setAuthAction } from "../../store/Auth/actionCreators";
import style from "./Reset.css";
import {
  BrowserRouter as Router,
  Redirect,
  Link,
  Route,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import queryString from "query-string";

function Reset() {
  //const location = useLocation();

  const [pass, setPass] = useState("");
  const [passSetComplete, setPassSetComplete] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    let password = pass;
    const config = resetTokenConfig();
    const body = JSON.stringify({ password });
    clearErrors();
    axios
      .post("../api/passReset", body, config)
      .then((res) => {
        handlePassResetSuccess(res.data);
      })
      .catch((err) => {
        updateError(err, "RESET_FAIL");
      });
  };

  const {search} = useLocation();

  const { token } = queryString.parse(search);
  const handlePassResetSuccess = (res) => {
    setPassSetComplete(true);
  };

  const clearErrors = () => {
    let errorUpdate = {
      msg: null,
      status: null,
      id: null,
    };
    setError(errorUpdate);
  };
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
  const auth = useSelector((state) => state.auth);
 
  const updateError = (err, id) => {
    if (err.response) {
 
      let errorUpdate = {
        msg: err.response.data,
        status: err.response.status,
        id: id,
      };
      setError(errorUpdate);
    }
  };

  
  const resetTokenConfig = () => {

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


  let buttonText = "Reset";

 

  console.log(3, token);
  return (
    <>
      {passSetComplete ? <Redirect to="/login" /> : null}
 
      {error.msg && error.msg.msg && (
        <Alert danger>
          {error.id === "RESET_FAIL" ? <p>{error.msg.msg}</p> : <></>}
        </Alert>
      )}
      <div className="Form">
        <Form>
          <Form.Group>
            <label htmlFor="pass">Password</label>
            <Form.Input
              type="password"
              id="pass"
              name="pass"
              placeholder="Password"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </Form.Group>

          <>
            <Button primary className="mr-4" onClick={onSubmit}>
              {buttonText}
            </Button>
          </>
        </Form>
      </div>
    </>
  );
}

export default Reset;
