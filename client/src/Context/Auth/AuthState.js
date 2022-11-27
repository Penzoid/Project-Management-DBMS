import React from "react";
import { useNavigate } from "react-router-dom";
import useRequest from "../../Hooks/Request";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
    const HOST = (process.env.BACKEND_URL || "http://localhost:5000") + "/auth";

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
                history.push("/");
            }
        );
    };

    return (
        <AuthContext.Provider value={{ loginUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthState;