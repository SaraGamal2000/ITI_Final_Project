// import React from "react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./login.css";
import { useAuthStore } from "../store/auth";
import { login } from "../utils/auth";
import Toast from "../plugin/Toast";
import { App_User } from "../utils/constants";
import useUserData from "../plugin/useUserData";
import apiInstance from "../utils/axios";

function Login_p() {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post(
    //             "http://localhost:8080/api/token/",
    //             {
    //                 username: email,
    //                 password: password,
    //             }
    //         );
    //         localStorage.setItem("token", response.data.access);
    //         alert("Login successful");
    //     } catch (error) {
    //         console.log(error);
    //         alert("Login failed");
    //     }
    // };
    // =================================================================
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [bioData, setBioData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    const handleBioDataChange = (event) => {
        setError(false);
        setBioData({
            ...bioData,
            [event.target.name]: event.target.value,
        });
    };

    const resetForm = () => {
        setBioData({
            email: "",
            password: "",
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        const { error } = await login(bioData.email, bioData.password);
        if (error) {
            Toast("error", `${JSON.stringify(error)}.`, "");
            setError(`${JSON.stringify(error)}.`);
            resetForm();
        } else {
            navigate(`/${App_User}/profile`);
        }

        setIsLoading(false);
    };

    const loggedIn = useAuthStore((state) => state.isLoggedIn)();

    // company
    const [profileData, setProfileData] = useState();
    const userId = useUserData()?.user_id;

    useEffect(() => {
        if (userId) fetchProfile();
    }, [userId]);

    const fetchProfile = async () => {
        try {
            apiInstance.get(`user/profile/${userId}/`).then((res) => {
                setProfileData(res.data);
            });
        } catch (error) {
            Toast("error", `Error fetching profile ${error}`, "");
        }
    };

    if (loggedIn && profileData?.user?.is_superuser === false) {
        return <Navigate to={`/${App_User}/profile`} />;
    }

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleBioDataChange}
                    value={bioData.email}
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleBioDataChange}
                    value={bioData.password}
                />
                <br />
                <button type="submit">
                    <Link to={"/profile"}></Link>
                    Login
                </button>
            </form>

            <Link to={"/resetpassword"}>Reset Password</Link>
        </div>
    );
}
export default Login_p;
