import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../Context/Auth/AuthContext";
import "./common.css";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(data);
  };

  return (
    <div
      style={{
        margin: "20px",
        marginTop: "60px",
        borderRadius: "5px",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container login-box">
        <center className="h1">Login</center>
        <hr />
        <form className="px-4 py-3" onSubmit={handleSubmit} method="post">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username :
            </label>
            <input
              value={data.username}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password :
            </label>
            <input
              value={data.password}
              onChange={handleChange}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="d-flex justify-content-evenly">
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
            <button type="reset" value="reset" className="btn btn-primary">
              Reset
            </button>
          </div>
        </form>
        <hr />
        <center className="d-flex justify-content-around">
          <Link className="dropdown-item" to="/create_account">
            New around here? Sign up
          </Link>
        </center>
      </div>
    </div>
  );
}
