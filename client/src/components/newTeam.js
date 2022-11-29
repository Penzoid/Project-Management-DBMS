import React, { useContext, useState } from "react";
import "./common.css";
import TeamContext from "../Context/Team/TeamContext";

export default function NewTeam() {
  const { createTeam } = useContext(TeamContext);

  const [data, setData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    setData({
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTeam(data);
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
        <center className="h1">Create Team</center>
        <hr />
        <form className="row g-3" method="post" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="name" className="form-label">
              TeamName
            </label>
            <input
              value={data.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              id="name"
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="description" className="form-label">
              Team description
            </label>
            <textarea
              value={data.description}
              onChange={handleChange}
              name="message"
              id="description"
              type={"text"}
              placeholder="Enter the message"
              className={`form-control`}
              rows="8"
            />
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Create Team
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
