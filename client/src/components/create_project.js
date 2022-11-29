import React, { useContext, useState } from "react";
import "./common.css";
import { useParams } from "react-router-dom";
import ProjectContext from "../Context/Project/ProjectContext";

export default function CreateProject() {
  let { team_id } = useParams();
  const { createProject } = useContext(ProjectContext);

  const [data, setData] = useState({
    name: "",
    description: "",
    teamId: team_id,
  });

  const handleChange = (e) => {
    setData({
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      teamId: team_id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProject(data);
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
        <center className="h1">Create New Project</center>
        <hr />
        <form className="row g-3" method="post" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="name" className="form-label">
              Project Name
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
              Project description
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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
