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
    checkRequest(
      response.status,
      json.error,
      null,
      () => { setCurrentTeam(json); }
    );
  }

  // Get All Teams
  const getAllTeams = async ({ id }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      checkRequest(
        401,
        null,
        null,
        () => { history("/login") }
      );
    }
    const response = await fetch(HOST + "/" + id, {
      method: "GET",
      headers: {
        "auth-token": JSON.stringify(token),
      },
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error,
      null,
      () => { setTeams(json); }
    );
  }

  // Create Team
  const createTeam = async ({ name, description }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      checkRequest(
        401,
        null,
        null,
        () => { history("/login") }
      );
    }
    const response = await fetch(HOST + "/", {
      method: "POST",
      headers: {
        "auth-token": JSON.stringify(token),
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
      }
    );
  };

  // Add Student
  const addStudent = async ({ teamId, username }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      checkRequest(
        401,
        null,
        null,
        () => { history("/login") }
      );
    }
    const response = await fetch(HOST + "/", {
      method: "POST",
      headers: {
        "auth-token": JSON.stringify(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ teamId, username }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error,
      "Student added successfully",
      () => { }
    );
  };

  return (
    <TeamContext.Provider value={{
      getById, getAllTeams, createTeam, addStudent,
      currentTeam, teams
    }}>
      {props.children}
    </TeamContext.Provider>
  );
};

export default TeamState;