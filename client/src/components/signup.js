import React, { useState } from "react";
import "./common.css";
// import AuthContext from "../Context/Auth/AuthContext";

export default function SignUp() {
  // const { loginUser } = useContext(AuthContext);
  const [type, SetType] = useState("S");
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
        <form class="row g-3">
          <div class="col-md-6">
            <label for="fname" class="form-label">
              First_Name
            </label>
            <input
              type="text"
              class="form-control"
              id="fname"
              placeholder="Enter First Name"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="lname" class="form-label">
              Last_Name
            </label>
            <input
              type="text"
              class="form-control"
              id="lname"
              placeholder="Enter Last Name"
              required
            />
          </div>
          <div class="col-md-6">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              placeholder="Enter Password"
              id="password"
            />
          </div>
          <div class="col-md-6">
            <label for="confirm_pass" class="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              class="form-control"
              placeholder="Re-Enter Password"
              id="confirm_pass"
            />
          </div>
          <div class="col-md-6">
            <label for="validationCustomUsername" class="form-label">
              Username
            </label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="text"
                class="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
              />
            </div>
          </div>
          <div class="col-md-6">
            <label for="validationCustomUsername" class="form-label">
              Email
            </label>
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="text"
                class="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
              />
            </div>
          </div>
          <div class="col-12">
            <label for="inputAddress" class="form-label">
              Address
            </label>
            <input
              type="text"
              class="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
          </div>
          <div class="col-4">
            <label for="mobile" class="form-label">
              Mobile Number
            </label>
            <input
              type="text"
              class="form-control"
              id="mobile"
              placeholder="Enter a valid mobile number"
            />
          </div>
          <div class="col-md-4">
            <label for="inputState" class="form-label">
              SignUp As
            </label>
            <select
              // value={type}
              id="inputState"
              class="form-select"
              onChange={(e) => {
                type === "S" ? SetType("T") : SetType("S");
              }}
            >
              <option name="type">Student</option>
              <option name="type">Teacher</option>
            </select>
          </div>
          <input type="hidden" value={type}></input>
          {type === "T" ? (
            <div class="col-4">
              <label for="mobile" class="form-label">
                Subject
              </label>
              <input
                type="text"
                class="form-control"
                id="mobile"
                placeholder="Enter Subject"
              />
            </div>
          ) : null}

          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck" />
              <label class="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
