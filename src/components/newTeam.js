import React from "react";
import "./common.css";

export default function NewTeam() {
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
        <center className="h1">Create Team</center>
        <hr />
        <form class="row g-3">
          <div class="col-md-6">
            <label for="inputEmail4" class="form-label">
              TeamName
            </label>
            <input type="text" class="form-control" id="inputEmail4" />
          </div>
          <div class="col-md-6">
            <label for="tname" class="form-label">
              Team Project Name
            </label>
            <input type="text" class="form-control" id="tname" />
          </div>
          <div class="col-md-12">
            <label for="desc" class="form-label">
              Project Description
            </label>
            <textarea
              name="message"
              id="desc"
              type={"text"}
              placeholder="Enter the message"
              className={`form-control`}
              rows="8"
            />
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
