import React, { useContext, useEffect, useState } from "react";
import ProjectContext from "../Context/Project/ProjectContext";
import { useParams } from "react-router-dom";

export default function Project() {
  let { project_id } = useParams();
  const { getById, currentProject, submitProject } = useContext(ProjectContext);

  useEffect(() => {
    getById({ id: project_id });
  }, [project_id]);

  const [data, setData] = useState({ link: "", id: project_id });
  const handleChange = () => {
    setData({
      link: document.getElementById("link").value,
      id: project_id,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitProject(data);
  };

  return (
    currentProject && (
      <div className="container">
        <h1>{currentProject.project_name}</h1>
        <b>description:</b>{" "}
        <span style={{ fontSize: "20px" }}>{currentProject.description}</span>
        <br></br>
        <b>status:</b>{" "}
        <span style={{ fontSize: "18px" }}>{currentProject.status}</span>
        <br />
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="link" className="form-label">
              submission Link
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text">
                <i className="fa fa-link"></i>
              </span>
              <input
                value={data.link}
                onChange={handleChange}
                type="url"
                className="form-control"
                id="link"
                placeholder="Enter Submission URL"
                required
              />
              <span>
                <button
                  className="btn btn-success"
                  style={{ marginLeft: "10px" }}
                >
                  Submit
                </button>
              </span>
            </div>
          </div>
        </form>
      </div>
    )
  );
}
