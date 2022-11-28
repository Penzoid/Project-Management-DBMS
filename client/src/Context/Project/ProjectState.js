import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../Hooks/Request";
import ProjectContext from "./ProjectContext";

const ProjectState = (props) => {
  const HOST = (process.env.BACKEND_URL || "http://localhost:5000") + "/project";

  const checkRequest = useRequest();
  const history = useNavigate();

  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);

  // Get By ID
  const getById = async ({ id }) => {
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
      () => { setCurrentProject(json); }
    );
  }

  // Get All Projects
  const getAllProjects = async ({ teamId }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      checkRequest(
        401,
        null,
        null,
        () => { history("/login") }
      );
    }
    const response = await fetch(HOST + "/all" + teamId, {
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
      () => { setProjects(json); }
    );
  }

  // Create Project
  const createProject = async ({ name, description, teamId }) => {
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
      body: JSON.stringify({ name, description, teamId }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error,
      "Project created successfully",
      async () => {
        setCurrentProject(json);
      }
    );
  };

  // Submit Project
  const submitProject = async ({ submissionLink }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      checkRequest(
        401,
        null,
        null,
        () => { history("/login") }
      );
    }
    const response = await fetch(HOST + "/submit/" + id, {
      method: "POST",
      headers: {
        "auth-token": JSON.stringify(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ submissionLink }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error,
      "Submitted successfully",
      () => { }
    );
  };

  // Grade Project
  const gradeProject = async ({ projectId, grade, remark }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      checkRequest(
        401,
        null,
        null,
        () => { history("/login") }
      );
    }
    const response = await fetch((process.env.BACKEND_URL || "http://localhost:5000") + "/grade", {
      method: "POST",
      headers: {
        "auth-token": JSON.stringify(token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectId, grade, remark }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error,
      "Submitted successfully",
      () => { setCurrentProject(json); }
    );
  };

  return (
    <ProjectContext.Provider value={{
      getById, getAllProjects, createProject, submitProject, gradeProject,
      currentProject, projects
    }}>
      {props.children}
    </ProjectContext.Provider>
  );
};

export default ProjectState;