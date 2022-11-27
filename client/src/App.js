import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import logo from "./images/class.png";
import SignUp from "./components/signup";
import ForgotPass from "./components/forgot_pass";
import Project from "./components/project";
import NewTeam from "./components/newTeam";
// import AuthState from "./Context/Auth/AuthState";
// import AlertState from "./Context/Alert/AlertState";

function App() {
  return (
    // <AlertState>
    //   <AuthState>
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
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="team" element={<Project />}></Route>
          <Route path="create_account" element={<SignUp />}></Route>
          <Route path="forgot_password" element={<ForgotPass />}></Route>
          <Route path="create_team" element={<NewTeam />}></Route>
        </Routes>
      </Router>

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
    //   </AuthState>
    // </AlertState>
  );
}

export default App;
