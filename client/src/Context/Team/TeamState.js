import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../Hooks/Request";
import TeamContext from "./TeamContext";

const TeamState = (props) => {
  const HOST = (process.env.BACKEND_URL || "http://localhost:5000") + "/team";

  const checkRequest = useRequest();
  const history = useNavigate();

  const [currentTeam, setCurrentTeam] = useState(null);
  const [teams, setTeams] = useState([]);

  // Get By ID
  const getById = async ({ id }) => {
    const response = await fetch(HOST + "/" + id, {
      method: "GET",
    });
    const json = await response.json();
    checkRequest(response.status, json.error, null, () => {
      setCurrentTeam(json);
    });
  };

  // Get All Teams
  const getAllTeams = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      history("/login");
      return;
    }
    const response = await fetch(HOST + "/", {
      method: "GET",
      headers: {
        "auth-token": token,
      },
    });
    const json = await response.json();
    checkRequest(response.status, json.error, null, () => {
      // json.map(el => getById(e.team_id));
      setTeams(json);
    });
  };

  // Create Team
  const createTeam = async ({ name, description }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      checkRequest(401, null, null, () => {
        history("/login");
      });
    }
    const response = await fetch(HOST + "/", {
      method: "POST",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });
    const json = await response.json();

    checkRequest(
      response.status,
      json.error,
      "Team created successfully",
      async () => {
        setCurrentTeam(json);
        history("/team");
      }
    );
  };

  // Add Student
  const addStudent = async ({ teamId, username }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      checkRequest(401, null, null, () => {
        history("/login");
      });
    }
    const response = await fetch(HOST + "/addStudent", {
      method: "POST",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId, username }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error,
      "Student added successfully",
      () => {
        history("/teams/" + teamId);
      }
    );
  };

  // Delete Team
  const deleteTeam = async ({ teamId }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const response = await fetch(HOST + "/" + teamId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      });
      const json = await response.json();
      checkRequest(
        response.status,
        json.error,
        "Deleted successfully",
        async () => {
          getAllTeams();
          setCurrentTeam(null);
          history("/team");
        }
      );
    } else {
      history("/login");
    }
  };

  // Leave Team
  const leaveTeam = async ({ teamId }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const response = await fetch(HOST + "/user/" + teamId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        }
      });
      const json = await response.json();
      checkRequest(
        response.status,
        json.error,
        "Left successfully",
        async () => {
          getAllTeams();
          setCurrentTeam(null);
          history("/team");
        }
      );
    } else {
      history("/login");
    }
  };

  return (
    <TeamContext.Provider
      value={{
        getById,
        getAllTeams,
        createTeam,
        addStudent,
        deleteTeam,
        leaveTeam,
        currentTeam,
        teams,
      }}
    >
      {props.children}
    </TeamContext.Provider>
  );
};

export default TeamState;
