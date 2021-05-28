import React, { useEffect, useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import Register from './Register';
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

import style from "./Login.css";



function Login() {
  return (
    <>
      <div className="Container">
        <h1>Login</h1>
        <div className="Nav">
          <button className="m-3">Register</button>
          <button className="m-3">Login</button>
          <button className="m-3">Guest</button>
        </div>
        <Register/>
      </div>
    </>
  );
}

export default Login;
