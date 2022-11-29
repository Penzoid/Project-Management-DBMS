import React, { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import logo from "../images/class.png";
import SignUp from "./signup";
import ForgotPass from "./forgot_pass";
import Teams from "./teams";
import NewTeam from "./newTeam";
import AuthContext from "../Context/Auth/AuthContext";
import Alert from "./Alert";
import Team from "./team";
import CreateProject from "./create_project";
import AddStudent from "./AddStudent";
import Project from "./project";
import ProjectGrade from "./projectGrade";

const Main = () => {
  const { fetchUser } = useContext(AuthContext);
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/create_account"
    )
      return;
    fetchUser();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Project-Manager
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="item-list navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/team">
                  Teams
                </a>
              </li>
              {JSON.parse(localStorage.getItem("token")) ? (
                <li className="nav-item">
                  <button
                    className="nav-link"
                    style={{ border: "none", background: "none" }}
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.clear();
                      history("/login");
                    }}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Alert />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="team" element={<Teams />}></Route>
        <Route path="create_account" element={<SignUp />}></Route>
        <Route path="forgot_password" element={<ForgotPass />}></Route>
        <Route path="create_team" element={<NewTeam />}></Route>
        <Route path="teams/:team_id" element={<Team />}></Route>
        <Route
          path="teams/:team_id/:project_id/grade"
          element={<ProjectGrade />}
        ></Route>
        <Route
          path="teams/:team_id/create_project"
          element={<CreateProject />}
        ></Route>
        <Route
          path="teams/:team_id/add_student"
          element={<AddStudent />}
        ></Route>
        <Route path="teams/:team_id/:project_id" element={<Project />}></Route>
      </Routes>

      <footer className="footer sticky-bottom">
        <center>
          <div className="foot-t"></div>

          <div className="container d-flex justify-content-around">
            <div>
              <img src={logo} alt="" />
            </div>
            <div className="d-flex align-items-center flex-column">
              <h3>Team members</h3>
              <div>Anish Jangir</div>
              <div>Abhishek Bansiwal</div>
              <div>Saksham Bindal</div>
              <div>Sachin Kumar</div>
              <div>Hitesh Mehata</div>
            </div>
            <div className="d-flex align-items-center flex-column">
              <div>One</div>
              <div>Two</div>
              <div>Three</div>
              <div>Four</div>
            </div>
            <div className="d-flex align-items-center flex-column">
              <div>One</div>
              <div>Two</div>
              <div>Three</div>
              <div>Four</div>
            </div>
          </div>
          <div className="my-5 h5">
            Made By:&copy;
            <a
              style={{ textDecoration: "None", color: "#234567" }}
              href="https://github.com/orgs/Penzoid/teams/dbms-team"
            >
              Team Penzoid
            </a>
          </div>
        </center>
      </footer>
    </>
  );
};

export default Main;
