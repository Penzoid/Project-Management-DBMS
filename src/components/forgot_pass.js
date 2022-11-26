import React from "react";
import "./common.css";

export default function ForgotPass() {
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
        <center className="h1">Forgot Password</center>
        <hr />
        <form action="" className="container" autoComplete="off">
          <div class="col-md-10">
            <label for="validationCustomUsername" class="form-label">
              Username
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
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "10px", marginTop: "10px" }}
          >
            Send Token
          </button>
        </form>
      </div>
    </div>
  );
}
