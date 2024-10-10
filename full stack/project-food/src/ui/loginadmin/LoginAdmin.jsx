import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

// import style
import "./LoginAdmin.css";

// store
import { useAuthStore } from "../../store/auth";

// plugin
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";

// utils
import api from "../../utils/api";
import {
    ACCESS_TOKEN,
    App_Company,
    App_User,
    REFRESH_TOKEN,
} from "../../utils/constants";
import { login } from "../../utils/auth";
import apiInstance from "../../utils/axios";

// ui components
import LoadingIndicator from "../loader/LoadingIndicator";
import ScrollToTopPages from "../scrolltotoppages/ScrollToTopPages";

function LoginAdmin() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [bioData, setBioData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

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
            // alert(JSON.stringify(error));
            Toast("error", `${JSON.stringify(error)}.`, "");
            setError(`${JSON.stringify(error)}.`);
            resetForm();
        } else {
            navigate(`/${App_Company}/profile`);
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
            // console.error("Error fetching profile", error);
            Toast("error", `Error fetching profile ${error}`, "");
        }
    };

    if (loggedIn && profileData?.user?.is_superuser === false)
        return <Navigate to={`/${App_User}/profile`} />;
    if (loggedIn && profileData?.user?.is_superuser === true)
        return <Navigate to={`/${App_Company}/profile`} />;

    return (
        <>
            <ScrollToTopPages />
            <div className="login">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Admin Login</h2>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        onChange={handleBioDataChange}
                                        value={bioData.email}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">
                                        Password:
                                    </label>
                                    <input
                                        type={
                                            !showPassword ? "password" : "text"
                                        }
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        onChange={handleBioDataChange}
                                        value={bioData.password}
                                        required
                                    />
                                    {!showPassword ? (
                                        <ion-icon
                                            name="eye-outline"
                                            className="icon-icon"
                                            onClick={() =>
                                                setShowPassword((show) => !show)
                                            }
                                        />
                                    ) : (
                                        <ion-icon
                                            name="eye-outline"
                                            className="icon-icon"
                                            onClick={() =>
                                                setShowPassword((show) => !show)
                                            }
                                        />
                                    )}
                                </div>

                                {isLoading && <LoadingIndicator />}
                                {error && (
                                    <div className="Error alert alert-danger">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginAdmin;
