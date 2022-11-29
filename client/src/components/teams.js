import React, { useContext, useEffect } from "react";
import "./common.css";
import TeamContext from "../Context/Team/TeamContext";
import AuthContext from "../Context/Auth/AuthContext";
import { Link } from "react-router-dom";

export default function Teams() {
  const { getAllTeams, teams } = useContext(TeamContext);
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

        <div className="d-flex project-box m-4" style={{ flexFlow: "wrap" }}>
          {teams.map((team, i) => {
            return (
              <Link
                to={`/teams/${team.team_id}`}
                className="card"
                style={{ width: "18rem", margin: "20px" }}
                key={i}
              >
                <div className="card-body card-style">
                  <div className="card-title">
                    <div className="h4">{team.team_name}</div>
                  </div>
                  <hr />
                  <p className="card-text">
                    <b>Description:</b> {team.team_desc}
                  </p>
                </div>
              </Link>
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
