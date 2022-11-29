import React, { useContext, useEffect } from "react";
import ProjectContext from "../Context/Project/ProjectContext";
import AuthContext from "../Context/Auth/AuthContext";
import { Link, useParams } from "react-router-dom";
import "./common.css";

export default function Team() {
  const { getAllProjects, projects } = useContext(ProjectContext);
  const { currentUser, fetchUser } = useContext(AuthContext);

  let { team_id } = useParams();

  useEffect(() => {
    if (team_id) {
      fetchUser();
      getAllProjects({ teamId: team_id });
    }
  }, [team_id]);

  return (
    currentUser && <div
      style={{
        margin: "20px",
        marginTop: "50px",
        borderRadius: "5px",
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{
          position: "fixed",
          width: "100vw",
          height: "90px",
          top: "60px",
          zIndex: 80,
          background: "white",
        }}
      >
        <center className="h1">Your Projects</center>
        {currentUser.type === "S" && (
          <div className="d-flex align-items-center tool-box">
            <Link to={`${team_id}/create_project`} className="btn btn-success">
              Add New Project
            </Link>
            <Link to={`${team_id}/add_student`} className="btn btn-success">
              Add Student
            </Link>
          </div>
        )}
        <hr style={{ color: "red" }} />
      </div>

      <div className="d-flex project-box m-4" style={{ flexFlow: "wrap" }}>
        {projects.length === 0 ? (
          <div className="h1 my-5">No results Found</div>
        ) : null}
        {projects.map((project, i) => {
          return (
            <Link
              to={`/teams/${team_id}/${project.project_id}`}
              className="card"
              style={{ width: "18rem", margin: "20px" }}
              key={i}
            >
              <div className="card-body card-style">
                <div className="card-title">
                  <div className="h4">{project.project_name}</div>
                </div>
                <hr />
                <p className="card-text">
                  <b>Description:</b> {project.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
