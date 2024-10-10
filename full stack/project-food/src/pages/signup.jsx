// import React from "react";
import "./signup.css";
import React, { useEffect, useState } from "react";
import authService from "./services/authService";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { register } from "../utils/auth";
import Toast from "../plugin/Toast";
import useUserData from "../plugin/useUserData";
import apiInstance from "../utils/axios";
import { App_User } from "../utils/constants";
function Signup_p() {
    // const [formData, setFormData] = useState({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     password: "",
    // });

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await authService.register(
    //             formData.first_name,
    //             formData.last_name,
    //             formData.email,
    //             formData.password
    //         );
    //         alert(response.data.details);
    //     } catch (error) {
    //         console.log(error.response.data);
    //     }
    // };
    // =================================================================
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);
    const [bioData, setBioData] = useState({
        full_name: "",
        email: "",
        password: "",
        password2: "",
    });
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
            full_name: "",
            email: "",
            password: "",
            password2: "",
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(false);

        const { error } = await register(
            bioData.full_name,
            bioData.email,
            bioData.password,
            bioData.password2
        );
        if (
            error ||
            !bioData.full_name ||
            !bioData.email ||
            !bioData.password ||
            !bioData.password2
        ) {
            Toast("error", `${JSON.stringify(error)}.`, "");
            setError(`${JSON.stringify(error)}.`);
            resetForm();
        } else {
            Toast(
                "success",
                "Registration successful! Please check your email to confirm your account.",
                ""
            );
            navigate(`/confirmemail`);
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

    if (loggedIn && profileData?.user?.is_superuser === false)
        return <Navigate to={`/${App_User}/profile`} />;

    return (
        <>
            <div className="container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="full_name">Full Name:</label>
                    <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        placeholder="Full Name"
                        onChange={handleBioDataChange}
                        value={bioData.full_name}
                        required
                    />
                    <br />
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        onChange={handleBioDataChange}
                        value={bioData.email}
                        required
                    />
                    <br />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleBioDataChange}
                        value={bioData.password}
                        required
                    />
                    <br />
                    <label htmlFor="password2">Confirm Password:</label>
                    <input
                        type="password"
                        name="password2"
                        id="password2"
                        placeholder="Password"
                        onChange={handleBioDataChange}
                        value={bioData.password2}
                        required
                    />
                    <br />
                    <button type="submit">Register</button>
                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                </form>
            </div>
        </>
    );
}
export default Signup_p;
