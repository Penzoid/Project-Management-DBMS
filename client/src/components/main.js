import React, { useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
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
import Grades from "./grades";

const Main = () => {
  const { fetchUser, currentUser } = useContext(AuthContext);
  const history = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchUser();
    if (
      location.pathname === "/" ||
      location.pathname === "/login" ||
      location.pathname === "/create_account"
    )
      return;
    if (!JSON.parse(localStorage.getItem("token"))) history("/login");
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Project-Manager
          </Link>
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
                <Link
                  className={`nav-link ${location.pathname === "/grades" ? "active" : ""
                    }`}
                  to="/grades"
                >
                  Grades
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${location.pathname === "/team" ? "active" : ""
                    }`}
                  to="/team"
                >
                  Teams
                </Link>
              </li>
              {JSON.parse(localStorage.getItem("token")) ? (
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.removeItem("token");
                      history("/login");
                    }}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    className={`nav-link ${location.pathname === "/login" ||
                      location.pathname === "/create_account"
                      ? "active"
                      : ""
                      }`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
            {currentUser && (
              <div className="fw-bold fs-5 m-2" style={{ color: "white" }}>
                Hello, {currentUser.username}
              </div>
            )}
          </div>
        </div>
      </nav>

      <Alert />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="grades" element={<Grades />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="team" element={<Teams />}></Route>
        <Route path="create_account" element={<SignUp />}></Route>
        <Route path="forgot_password" element={<ForgotPass />}></Route>
        <Route path="create_team" element={<NewTeam />}></Route>
        <Route path="teams/:team_id" element={<Team />}></Route>
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

      <footer className="footer sticky-bottom bg-dark">
        <center>
          <div className="foot-t"></div>

          <div className="container d-flex justify-content-around align-items-end">
            <div style={{ maxWidth: "30%" }}>
              <img src={logo} alt="" />
              <div className="text-muted">This project aims to provide a platform for students to form groups, collaborate on projects, and submit their work. Teachers have the option of grading the work and providing feedback.</div>
            </div>
            <div className="d-flex align-items-start flex-column">
              <h3><b>Team members</b></h3>
              <div>Anish Jangir</div>
              <div>Abhishek Bansiwal</div>
              <div>Saksham Bindal</div>
              <div>Sachin Kumar</div>
              <div>Hitesh Mehata</div>
            </div>
            <div className="d-flex align-items-start flex-column">
              <h3><b>Useful Links</b></h3>
              <Link to="/">Home</Link>
              <Link to="/grades">Grades</Link>
              <Link to="/team">Teams</Link>
              <Link to="/login">Login</Link>
              <Link to="/create_account">SignUp</Link>
            </div>
          </div>
          <div className="my-5 h5">
            Made By:&copy;
            <a
              style={{ textDecoration: "None" }}
              href="https://github.com/orgs/Penzoid/teams/dbms-team"
              target="_blank"
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
