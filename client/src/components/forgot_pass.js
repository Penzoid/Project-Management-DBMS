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
      <div className="container login-box">
        <center className="h1">Forgot Password</center>
        <hr />
        <form action="" className="container" autoComplete="off">
          <div className="col-md-10">
            <label for="validationCustomUsername" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                <i className="fa fa-envelope"></i>
              </span>
              <input
                type="text"
                className="form-control"
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
