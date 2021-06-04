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
import { useAuth } from "../../hooks/useAuth";
import style from "./Login.css";
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

function Register() {
  //const location = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [gotoDashboard, setGotoDashboard] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isResetPasswordMode, setResetPasswordMode] = useState(false);
  const [resetPasswordEmailSent, setResetPasswordEmailSent] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const auth = useSelector((state) => state.auth);
  const [error, clearErrors, updateError, tokenConfig] = useAuth(auth.token);
  const dispatch = useDispatch();
  let location = useLocation();
  console.log(location.pathname);
  React.useEffect(() => {

    setIsLoginMode(location.pathname === "/login" ? true : false);
  })

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
    localStorage.setItem("token", res.token);
    dispatch(setAuthAction(authUpdate));
    clearErrors();
    setGotoDashboard(true);
  };

  const handleLogin = () => {
    setIsLoginMode(true);
    setResetPasswordMode(false);
    console.log("clicked");
    setResetPasswordEmailSent(false);
    clearErrors();
  };

  const handleRegister = () => {
    setIsLoginMode(false);
    setResetPasswordMode(false);
    setResetPasswordEmailSent(false);
    clearErrors();
  }

  const handleContinueAsGuest = () => {
    setGotoDashboard(true);
  }


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

    setGotoDashboard(true);
  };

  const handleCloseReset = () => {
    setResetPasswordMode(false);
    setIsLoginMode(true);
    setResetPasswordEmailSent(false);
  }

  let buttonText = isResetPasswordMode
    ? "Reset"
    : isLoginMode
      ? "Login"
      : "Register";

  useEffect(() => {
    console.log("erer");
  });


  return (
    <>
      {gotoDashboard ? <Redirect to="/dashboard" /> : null}

      {JSON.stringify(auth)}

      <div className="Nav">
        <Link to="/register">    <button
        // className="m-3"
        // onClick={() => {
        //   handleRegister();
        // }}
        >
          Register
        </button></Link>
        {/* <button
          className="m-3"
          onClick={() => {
            handleLogin();
          }}
        >
          Login
        </button> */}
        <Link to="/login">    <button
        // className="m-3"
        // onClick={() => {
        //   handleRegister();
        // }}
        >
          Login
        </button></Link>
        <Link to="/dashboard"> <button className="m-3" >Continue as Guest</button></Link>
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
                {isLoginMode && !isResetPasswordMode && (
                  <a onClick={handlePassReset} href="#">
                    Reset Password
                </a>
                )}
                {isResetPasswordMode && (
                  <Button
                    secondary
                    onClick={() => {
                      handleCloseReset();
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
