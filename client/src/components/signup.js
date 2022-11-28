import React, { useState, useContext } from "react";
import "./common.css";
import AuthContext from "../Context/Auth/AuthContext";

export default function SignUp() {
  const [data, setData] = useState({
    fname: "",
    lname: "",
    password: "",
    confirm_pass: "",
    username: "",
    email: "",
    address: "",
    mobile: "",
    subject: "",
    type: "S",
  });
  const { registerUser } = useContext(AuthContext);

  const handleChange = () => {
    setData({
      fname: document.getElementById("fname").value,
      lname: document.getElementById("lname").value,
      password: document.getElementById("password").value,
      confirm_pass: document.getElementById("confirm_pass").value,
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      mobile: document.getElementById("mobile").value,
      type: document.getElementById("type").value,
      subject: document.getElementById("subject").value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.type === "S") setData({ subject: "" });
    await registerUser(data);
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
        <center className="h1">Create Account</center>
        <hr />
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="fname" className="form-label">
              First_Name
            </label>
            <input
              value={data.fname}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="fname"
              placeholder="Enter First Name"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lname" className="form-label">
              Last_Name
            </label>
            <input
              value={data.lname}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="lname"
              placeholder="Enter Last Name"
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              value={data.password}
              onChange={handleChange}
              type="password"
              className="form-control"
              placeholder="Enter Password"
              id="password"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="confirm_pass" className="form-label">
              Confirm Password
            </label>
            <input
              value={data.confirm_pass}
              onChange={handleChange}
              type="password"
              className="form-control"
              placeholder="Re-Enter Password"
              id="confirm_pass"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                value={data.username}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="username"
                aria-describedby="inputGroupPrepend"
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                value={data.email}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="email"
                aria-describedby="inputGroupPrepend"
                required
              />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              value={data.address}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="address"
              placeholder="1234 Main St"
            />
          </div>
          <div className="col-4">
            <label htmlFor="mobile" className="form-label">
              Mobile Number
            </label>
            <input
              value={data.mobile}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="mobile"
              placeholder="Enter a valid mobile number"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              SignUp As
            </label>
            <select id="type" onChange={handleChange} className="form-select">
              <option name="type" value={"S"}>
                Student
              </option>
              <option name="type" value="T">
                Teacher
              </option>
            </select>
          </div>
          {data.type === "T" ? (
            <div className="col-4">
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <input
                value={data.subject}
                onChange={handleChange}
                type="text"
                className="form-control"
                id="subject"
                placeholder="Enter Subject"
              />
            </div>
          ) : (
            <input
              type="hidden"
              id="subject"
              value={data.subject}
              onChange={handleChange}
            ></input>
          )}

          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridCheck"
              />
              <label className="form-check-label" htmlFor="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-evenly">
            <button type="submit" className="btn btn-primary">
              Create Account
            </button>
            <button type="reset" value="reset" className="btn btn-primary">
              Reset
            </button>
          </div>
          <hr />
          <center className="d-flex justify-content-around">
            <a className="dropdown-item" href="/login">
              Already have an account? Login
            </a>
          </center>
        </form>
      </div>
    </div>
  );
}
