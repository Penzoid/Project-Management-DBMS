import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../Hooks/Request";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
  const HOST = (process.env.BACKEND_URL || "http://localhost:5000") + "/auth";

  const [currentUser, setCurrentUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const checkRequest = useRequest();
  const history = useNavigate();

  // Logging In
  const loginUser = async ({ username, password }) => {
    const response = await fetch(HOST + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const json = await response.json();
    checkRequest(
      response.status,
      json.error,
      "Logged in successfully",
      async () => {
        localStorage.setItem("token", JSON.stringify(json.authToken));
        history("/");
        fetchUser();
      }
    );
  };

  // Register
  const registerUser = async ({
    fname,
    lname,
    password,
    confirm_pass,
    username,
    email,
    address,
    mobile,
    type,
    git_link,
    subject,
  }) => {
    if (password === confirm_pass) {
      const response = await fetch(HOST + "/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: fname,
          last_name: lname,
          email,
          password,
          username,
          address,
          mobile,
          type,
          git_link,
          subject,
        }),
      });
      const json = await response.json();
      checkRequest(
        response.status,
        json.error,
        "Registered successfully",
        async () => {
          localStorage.setItem("token", JSON.stringify(json.authToken));
          history("/");
          fetchUser();
        }
      );
    } else {
      checkRequest(404, "Passwords do not match", "", () => { });
    }
  };

  // Fetch User
  const fetchUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const response = await fetch(HOST + "/fetch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      const json = await response.json();
      checkRequest(response.status, json.error, null, async () => {
        setCurrentUser(json);
      });
    }
  };

  // Fetch By ID
  const fetchUserByID = async ({ id }) => {
    const response = await fetch(HOST + "/fetch/" + id, {
      method: "POST",
    });
    const json = await response.json();
    checkRequest(response.status, json.error, null, async () => {
      setUserDetails(json);
    });
  };

  // Delete User
  const deleteUser = async ({ password }) => {
    const token = JSON.parse(localStorage.getItem("token"));
    if (token) {
      const response = await fetch(HOST + "/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ password }),
      });
      const json = await response.json();
      checkRequest(
        response.status,
        json.error,
        "Deleted successfully",
        async () => {
          localStorage.removeItem("token");
          setCurrentUser(null);
          history("/");
        }
      );
    } else {
      history("/login");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginUser,
        registerUser,
        fetchUser,
        deleteUser,
        fetchUserByID,
        currentUser,
        userDetails
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;