import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// import style
import "./ChangePassword.css";

// plugin
import Toast from "../../plugin/Toast";

// utils
import apiInstance from "../../utils/axios";

// ui components
import ScrollToTopPages from "../scrolltotoppages/ScrollToTopPages";
import LoadingIndicator from "../loader/LoadingIndicator";

function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const otp = searchParams.get("otp");
    const uidb64 = searchParams.get("uidb64");
    const reset_token = searchParams.get("reset_token");

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (password !== confirmPassword) {
            setIsLoading(false);
            Toast().fire({
                icon: "warning",
                text: "Password Does Not Match",
            });
        } else {
            setIsLoading(true);

            const formdata = new FormData();
            formdata.append("otp", otp);
            formdata.append("uidb64", uidb64);
            formdata.append("reset_token", reset_token);
            formdata.append("password", password);

            try {
                apiInstance
                    .post(`user/password-change/`, formdata)
                    .then((res) => {
                        navigate(`/login`);
                    });
                Toast("success", "Password Changed Successfully!");
            } catch (error) {
                console.log(error);

                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <ScrollToTopPages />
            <div className="changepassword">
                <div className="container">
                    <h2 className="title">Change Password</h2>

                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="password">
                                Password:
                            </label>
                            <input
                                type={!showPassword ? "password" : "text"}
                                className="form-control"
                                id="password"
                                // name="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* <ion-icon name="eye-off-outline"></ion-icon> */}
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

                        <div className="mb-3">
                            <label className="form-label" htmlFor="password2">
                                Confirm Password:
                            </label>
                            <input
                                type={!showPassword ? "password" : "text"}
                                className="form-control"
                                // name="password2"
                                id="password2"
                                required
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>

                        {isLoading && <LoadingIndicator />}
                        {error && (
                            <div className="Error alert alert-danger">
                                {error}
                            </div>
                        )}

                        <button type="submit" className="btn btn-primary w-100">
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
