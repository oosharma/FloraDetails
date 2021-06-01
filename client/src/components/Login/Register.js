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
import style from "./Login.css";
import {
  BrowserRouter as Router,
  Redirect,
  Link,
  Route,
  useParams,
  useHistory, useLocation
} from "react-router-dom";
import queryString from 'query-string'


function Register() {
  //const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isResetPasswordMode, setResetPasswordMode] = useState(false);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState(false);

  const [resetPassword, setResetPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

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

 
  // const values = queryString.parse(search)
  // console.log(11, values.filter) // "top"
  // console.log(22, values.origin) // "im"

  const onSubmit = (e) => {
    e.preventDefault();
    const config = tokenConfig();

    if (isLoginMode) {
      const config = tokenConfig();
      const body = JSON.stringify({ email, password: pass });
      axios
        .post("api/auth", body, config)
        .then((res) => {
          console.log("here");
          loginSuccess(res.data);
        })
        .catch((err) => {
          console.log("here");
          updateError(err, "LOGIN_FAIL");
        });
    } else if (isResetPasswordMode) {
      setShowLoader(true);

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
          setShowLoader(false);
        });
    } else {
      const body = JSON.stringify({
        name: name,
        email: email,
        password: pass,
      });
      console.log(body);
      axios
        .post("api/users", body, config)
        .then((res) => {
          registerSuccess(res.data);
        })
        .catch((err) => {
          console.log("erdr");
          console.log(err);
          updateError(err, "REGISTER_FAIL");
        });
    }
  };

  const handlePassReset = () => {
    setResetPasswordMode(true);
    setIsLoginMode(false);
    clearErrors();
  };
  const handleResetEmailSentSuccess = (res) => {
    setResetPasswordEmailSent(true);

    clearErrors();
    //enter code to remove state for showing reset here
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
    dispatch(setAuthAction(authUpdate));

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

  const loginSuccess = (res) => {
    let authUpdate = {
      token: res.token,
      isAuthorized: true,
      isLoading: false,
      user: res.user,
    };
    localStorage.setItem("token", res.token);
    dispatch(setAuthAction(authUpdate));
    clearErrors();

    setLoggedIn(true);

    // loadItems();
    //clearSearchBarTable();

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
    dispatch(setAuthAction(authUpdate));
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

  let buttonText = isResetPasswordMode
    ? "Reset"
    : isLoginMode
    ? "Login"
    : "Register";

    useEffect(() => {console.log('erer')})
    const location = useLocation();
    console.log(3, location);
  return (
    <>
      {loggedIn ? <Redirect to="/" /> : null}

      {JSON.stringify(auth)}

      <div className="Nav">
        <button
          className="m-3"
          onClick={() => {
            setIsLoginMode(false);
            setResetPasswordMode(false);
            setResetPasswordEmailSent(false);
            clearErrors();
          }}
        >
          Register
        </button>
        <button
          className="m-3"
          onClick={() => {
            setIsLoginMode(true);
            setResetPasswordMode(false);
            console.log("clicked");
            setResetPasswordEmailSent(false);
            clearErrors();
          }}
        >
          Login
        </button>
        <button className="m-3">Continue as Guest</button>
      </div>
      {error.msg && error.msg.msg && (
        <Alert danger>
          {error.id === "REGISTER_FAIL" || error.id === "LOGIN_FAIL" ? (
            <p>{error.msg.msg}</p>
          ) : (
            <></>
          )}
        </Alert>
      )}
      <div className="Form">
        <Form>
          {!(isLoginMode || isResetPasswordMode) && (
            <Form.Group>
              <label htmlFor="name">Name</label>
              <Form.Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>
          )}

          <Form.Group>
            <label htmlFor="email">Email address</label>
            <Form.Input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text text="muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          {!isResetPasswordMode && (
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
          )}

          

          {isResetPasswordMode && (
            <>
              {resetPasswordEmailSent ? (
                <>
                  <Alert success>
                    <p>Reset link sent to your email</p>
                  </Alert>
                </>
              ) : (
                <>
                  {error.msg && error.msg.msg && (
                    <Alert danger>
                      {error.id === "RESET_FAIL" ? (
                        <p>{error.msg.msg}</p>
                      ) : (
                        <></>
                      )}
                    </Alert>
                  )}
                </>
              )}
            </>
          )}

          {showLoader ? (
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
              <Button primary className="mr-4" onClick={onSubmit}>
              {buttonText}
              </Button>
              {isLoginMode && (
            <a onClick={handlePassReset} href="#">
              Reset Password
            </a>
          )}
              {isResetPasswordMode && (
                <Button
                  secondary
                  onClick={() => {
                    setResetPasswordMode(false);
                    setIsLoginMode(true);
                    setResetPasswordEmailSent(false);
                  }}
                >
                  Close
                </Button>
              )}
            </>
          )}
        </Form>
      </div>
    </>
  );
}

export default Register;
