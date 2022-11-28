import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AuthState from "./Context/Auth/AuthState";
import AlertState from "./Context/Alert/AlertState";
import Main from "./components/main";

function App() {
  return (
    <Router>
      <AlertState>
        <AuthState>
          <Main />
        </AuthState>
      </AlertState>
    </Router>
  );
}

export default App;
