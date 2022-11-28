import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthState from "./Context/Auth/AuthState";
import AlertState from "./Context/Alert/AlertState";
import TeamState from "./Context/Team/TeamState";
import ProjectState from "./Context/Project/ProjectState";
import Main from "./components/main";

function App() {
  return (
    <Router>
      <AlertState>
        <AuthState>
          <TeamState>
            <ProjectState>
              <Main />
            </ProjectState>
          </TeamState>
        </AuthState>
      </AlertState>
    </Router>
  );
}

export default App;
