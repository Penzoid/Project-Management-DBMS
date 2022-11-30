import React, { useContext, useEffect } from "react";
import TeamContext from "../Context/Team/TeamContext";
import ProjectContext from "../Context/Project/ProjectContext";
import AuthContext from "../Context/Auth/AuthContext";
import { Link, useParams } from "react-router-dom";
import "./common.css";

export default function Team() {
  const { currentTeam, getById, leaveTeam } = useContext(TeamContext);
  const { getAllProjects, projects, deleteProject } = useContext(ProjectContext);
  const { currentUser, fetchUser } = useContext(AuthContext);

  let { team_id } = useParams();

  useEffect(() => {
    if (team_id) {
      fetchUser();
      getById({ id: team_id });
      getAllProjects({ teamId: team_id });
    }
  }, [team_id]);

  return (
    currentUser && (
      <>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="projects-tab"
              data-bs-toggle="tab"
              data-bs-target="#projects-tab-pane"
              type="button"
              role="tab"
              aria-controls="projects-tab-pane"
              aria-selected="true"
            >
              Projects
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="members-tab"
              data-bs-toggle="tab"
              data-bs-target="#members-tab-pane"
              type="button"
              role="tab"
              aria-controls="members-tab-pane"
              aria-selected="true"
            >
              Members
            </button>
          </li>
          {currentUser.type === "S" && currentTeam &&
            <li className="nav-item" role="presentation">
              <button className="nav-link text-danger" data-bs-toggle="modal"
                data-bs-target={`#confirmLeaveTeamModal_${team_id}`}>
                Leave Team
              </button>
              <div
                className="modal fade"
                id={`confirmLeaveTeamModal_${team_id}`}
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby={`confirmLeaveTeamModal_${team_id}`}
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1
                        className="modal-title fs-5"
                        id="staticBackdropLabel"
                      >
                        Confirm Leave
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      Do you really want to leave the team{" "}
                      <b>{currentTeam.team_name}</b>? You will lose complete access to this team. Remember, this action is irreversible.
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        onClick={() => leaveTeam({ teamId: team_id })}
                        className="btn btn-danger"
                        data-bs-dismiss="modal"
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          }
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="projects-tab-pane"
            role="tabpanel"
            aria-labelledby="projects-tab"
            tabIndex={0}
          >
            <div
              style={{
                borderRadius: "5px",
                padding: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >


              <div className="d-flex m-4" style={{ flexFlow: "wrap" }}>
                {projects.length === 0 ? (
                  <div className="h1">No results found</div>
                ) : null}
                {projects.map((project, i) => {
                  return (
                    <div className="card m-2" style={{ width: "18rem" }} key={i}>
                      <div className="card-header fs-4 fw-semibold">
                        {project.project_name}
                      </div>
                      <div className="card-body" style={{ minHeight: "100px" }}>
                        <p className="card-text">{project.description}</p>
                      </div>
                      <div className="card-footer">
                        <Link
                          to={`/teams/${team_id}/${project.project_id}`}
                          className="card-link text-primary"
                          key={i}
                        >
                          View
                        </Link>
                        {currentUser.type === "S" && (
                          <a
                            href="#"
                            className="card-link text-danger"
                            data-bs-toggle="modal"
                            data-bs-target={`#confirmDeleteProjectModal_${project.project_id}`}
                          >
                            Delete
                          </a>
                        )}
                      </div>
                      {currentUser.type === "S" && (
                        <div
                          className="modal fade"
                          id={`confirmDeleteProjectModal_${project.project_id}`}
                          data-bs-backdrop="static"
                          data-bs-keyboard="false"
                          tabIndex={-1}
                          aria-labelledby={`confirmDeleteProjectModal_${project.project_id}`}
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h1
                                  className="modal-title fs-5"
                                  id="staticBackdropLabel"
                                >
                                  Confirm Delete
                                </h1>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                />
                              </div>
                              <div className="modal-body">
                                Do you really want to delete the project{" "}
                                <b>{project.project_name}</b>? Grades associated with
                                this project will also be deleted. Remember, this action
                                is irreversible.
                              </div>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-bs-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  onClick={() => deleteProject({ projectId: project.project_id, teamId: team_id })}
                                  className="btn btn-danger"
                                  data-bs-dismiss="modal"
                                >
                                  Confirm
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {currentUser.type === "S" && (
              <Link className="add-btn" to={"/teams/" + team_id + "/create_project"}>
                <i className="fa fa-plus"></i>
              </Link>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="members-tab-pane"
            role="tabpanel"
            aria-labelledby="members-tab"
            tabIndex={0}
          >
            {currentTeam && currentTeam.students && <table className="table">
              <thead>
                <tr>
                  <th scope="col">S.no</th>
                  <th scope="col">Username</th>
                  <th scope="col">Joined On</th>
                </tr>
              </thead>
              <tbody>
                {currentTeam.students.map((el, i) => (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>{el.s_id}</td>
                    <td>{el.joined_on}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            }
            {currentUser.type === "S" && (
              <Link className="add-btn" to={`/teams/${team_id}/add_student`}>
                <i className="fa fa-plus"></i>
              </Link>
            )}
          </div>
        </div>
      </>



    )
  );
}
