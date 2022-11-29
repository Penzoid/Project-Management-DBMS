import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamContext from "../Context/Team/TeamContext";

export default function AddStudent() {
  let { team_id } = useParams();
  const { addStudent, getById, currentTeam } = useContext(TeamContext);

  const [data, setData] = useState({
    username: "",
    teamId: "",
  });

  useEffect(() => {
    getById({ id: team_id });
  }, [team_id]);

  const handleChange = () => {
    setData({
      username: document.getElementById("username").value,
      teamId: team_id,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addStudent(data);
  };

  return (
    currentTeam && (
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
          <center className="h1">Add Student in {currentTeam.team_name}</center>
          <hr />
          <form className="row g-3" method="post" onSubmit={handleSubmit}>
            <div className="input-group has-validation">
              <span className="input-group-text" id="uname">
                @
              </span>
              <input
                onChange={handleChange}
                type="text"
                className="form-control"
                id="username"
                aria-describedby="uname"
                required
              />
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Add Student
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
