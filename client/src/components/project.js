import React, { useContext, useEffect, useState } from "react";
import ProjectContext from "../Context/Project/ProjectContext";
import AuthContext from "../Context/Auth/AuthContext";
import { useParams } from "react-router-dom";
import ProjectGrade from "./projectGrade";

export default function Project() {
  let { project_id } = useParams();
  const { getById, currentProject, submitProject, gradeProject } =
    useContext(ProjectContext);
  const { currentUser, fetchUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
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
    currentProject && currentUser && (
      <div className="container">
        <h1>{currentProject.project_name}</h1>
        <b>description:</b>{" "}
        <span style={{ fontSize: "20px" }}>{currentProject.description}</span>
        <br></br>
        <b>status:</b>{" "}
        <br></br>
        <b>submission link:</b>{" "}<a href={currentProject.sub_link} target="_blank">{currentProject.sub_link}</a>
        <br></br>
        <span style={{ fontSize: "18px" }}>{currentProject.status}</span>
        <br />
        {currentProject.status === "SUBMITTED" ? (
          <div>
            <div style={{ color: "green" }}>Project Submitted</div>{" "}
            {currentUser.type === "S" && (
              <span> Waiting for grades</span>
            )}
          </div>
        ) : currentProject.status === "GRADED" ? (
          <div
            style={{
              border: "1px solid green",
              borderRadius: "5px",
              marginTop: "15px",
              padding: "15px",
            }}
          >
            <div className="h3">Project Graded</div>
            <b>Graded By:</b>{" "}
            <span className="h5">{currentProject.gradedBy}</span>
            <br />
            <b>Grades:</b>
            <span className="h6">{currentProject.grade}</span>
            <br />
            <b>Remarks:</b>
            <span>{currentProject.remark}</span>
          </div>
        ) : (
          currentUser.type === "S" && (
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
          )
        )}
        {currentProject.status === "SUBMITTED" &&
          currentUser.type === "T" && (
            <ProjectGrade
              project_id={project_id}
              currentProject={currentProject}
              gradeProject={gradeProject}
            />
          )}
      </div>
    )
  );
}
