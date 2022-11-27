import React, { useContext } from "react";
import AuthContext from "../Context/Auth/AuthContext";
import "./common.css";

export default function Login() {
  const { loginUser } = useContext(AuthContext);

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
      <div class="container login-box">
        <center className="h1">Login</center>
        <hr />
        <form class="px-4 py-3">
          <div class="mb-3">
            <label for="exampleDropdownFormEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              id="exampleDropdownFormEmail1"
              placeholder="email@example.com"
            />
          </div>
          <div class="mb-3">
            <label for="exampleDropdownFormPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleDropdownFormPassword1"
              placeholder="Password"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="dropdownCheck"
              />
              <label class="form-check-label" for="dropdownCheck">
                Remember me
              </label>
            </div>
          </div>
          <div className="d-flex justify-content-evenly">
            <button type="submit" class="btn btn-primary">
              Sign in
            </button>
            <button type="reset" value="reset" class="btn btn-primary">
              Reset
            </button>
          </div>
        </form>
        <hr />
        <center class="d-flex justify-content-around">
          <a class="dropdown-item" href="/create_account">
            New around here? Sign up
          </a>
          <a class="dropdown-item" href="/forgot_password">
            Forgot password?
          </a>
        </center>
      </div>
    </div>
  );
}
