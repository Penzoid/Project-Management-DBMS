import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./common.css";

export default function Home() {
  const [projects, setProject] = useState([]);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => setProject(response.data));
  }, []);
  const runCallback = () => {
    const row = [];
    projects.forEach((project) => {
      row.push(
        <a href="/" className="card" style={{ width: "18rem", margin: "20px" }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h3>Id: {project.id}</h3>
            <h5 className="card-title">UserId: {project.userId}</h5>
            <p className="card-text">Title: {project.title}</p>
            <a href="/" className="btn btn-primary">
              {project.completed}
            </a>
          </div>
        </a>
      );
    });
    return row;
  };
  return (
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
        <h1>Your Teams</h1>
      </div>
      <form
        className="d-flex"
        role="search"
        style={{ position: "fixed", zIndex: 80, top: "80px", right: "50px" }}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>

      <div className="d-flex project-box m-4" style={{ flexFlow: "wrap" }}>
        {runCallback()}
      </div>
      <a className="add-btn" href="/create_team">
        <i className="fa fa-plus"></i>
      </a>
    </div>
  );
}