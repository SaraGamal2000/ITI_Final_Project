// import
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

//
import "./Login.css";

// store
import { useAuthStore } from "../../store/auth";

// plugin
import Toast from "../../plugin/Toast";
import useUserData from "../../plugin/useUserData";

// utils
import { ACCESS_TOKEN, App_User, REFRESH_TOKEN } from "../../utils/constants";
import { login } from "../../utils/auth";
import apiInstance from "../../utils/axios";

// ui components
import LoadingIndicator from "../loader/LoadingIndicator";
import ScrollToTopPages from "../scrolltotoppages/ScrollToTopPages";
import Loader from "../loader/Loader";

function Login() {
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
        <>
            <ScrollToTopPages />
            <div className="login">
                <div className="container">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="title">Login</h2>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label
                                        className="form-label"
                                        htmlFor="email"
                                    >
                                        Email:
                                    </label>
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
                                    <label
                                        className="form-label"
                                        htmlFor="password"
                                    >
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
                                            name="eye-off-outline"
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

                            <div className="other">
                                <p className="mt-3 text-center ">
                                    Don't have an account?
                                </p>

                                <div>
                                    <button
                                        className="btn btn-link "
                                        onClick={() => {
                                            navigate("/signup");
                                        }}
                                    >
                                        Sign up
                                    </button>

                                    <button
                                        className="btn btn-link "
                                        onClick={() => {
                                            navigate("/resetpassword");
                                        }}
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
