import React, { useContext, useEffect } from "react";
import "./common.css";
import TeamContext from "../Context/Team/TeamContext";
import AuthContext from "../Context/Auth/AuthContext";
import { Link } from "react-router-dom";

export default function Teams() {
  const { getAllTeams, deleteTeam, teams } = useContext(TeamContext);
  const { currentUser, fetchUser } = useContext(AuthContext);

  useEffect(() => {
    fetchUser();
    getAllTeams();
  }, []);

  return (
    currentUser && (
      <div
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
          className="d-flex justify-content-evenly align-items-center"
          style={{
            position: "fixed",
            width: "100vw",
            height: "90px",
            top: "50px",
            zIndex: 80,
            background: "white",
          }}
        >
          <h1>{currentUser.type === "S" ? "Your" : ""} Teams</h1>
        </div>

        <div className="d-flex flex-wrap">
          {teams.map((team, i) => {
            return (
              <div className="card m-2" style={{ width: "18rem" }} key={i}>
                <div className="card-header fs-4 fw-semibold">
                  {team.team_name}
                </div>
                <div className="card-body" style={{ minHeight: "100px" }}>
                  <p className="card-text">{team.team_desc}</p>
                </div>
                <div className="card-footer">
                  <Link
                    to={`/teams/${team.team_id}`}
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
                      data-bs-target={`#confirmDeleteTeamModal_${team.team_id}`}
                    >
                      Delete
                    </a>
                  )}
                </div>
                {currentUser.type === "S" && (
                  <div
                    className="modal fade"
                    id={`confirmDeleteTeamModal_${team.team_id}`}
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex={-1}
                    aria-labelledby={`confirmDeleteTeamModal_${team.team_id}`}
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
                          Do you really want to delete the team{" "}
                          <b>{team.team_name}</b>? All projects associated with
                          this team will also be deleted. Remember, this action
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
                            onClick={() => deleteTeam({ teamId: team.team_id })}
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
        {currentUser.type === "S" && (
          <Link className="add-btn" to="/create_team">
            <i className="fa fa-plus"></i>
          </Link>
        )}
      </div>
    )
  );
}
