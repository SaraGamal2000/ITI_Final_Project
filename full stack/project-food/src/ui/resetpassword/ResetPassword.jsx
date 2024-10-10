// import
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// import styles
import "./ResetPassword.css";

// bootstrap components
import { Button } from "react-bootstrap";

// utils
import apiInstance from "../../utils/axios";

// ui components
import LoadingIndicator from "../loader/LoadingIndicator";

const ResetPassword = () => {
    const navigate = useNavigate();
    // =================================================================
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!email) {
            setIsLoading(false);
            return;
        }

        try {
            await apiInstance
                .get(`user/password-reset/${email}/`)
                .then((res) => {
                    setEmail("");
                    Swal.fire({
                        icon: "success",
                        title: "Password Reset Email Sent!",
                    });
                });
            setIsLoading(false);
        } catch (error) {
            console.log();
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="resetpassword">
                <div className="container mt-5">
                    <h2 className="title">Reset Password</h2>
                    {/* {error && <div className="alert alert-danger">{error}</div>}
                    {message && (
                        <div className="alert alert-success">{message}</div>
                    )} */}

                    {/* <form onSubmit={handleEmailSubmit}> */}
                    <div className="mb-3">
                        <label className="form-label" htmlFor="email">
                            Email:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>

                    {isLoading && <LoadingIndicator />}

                    <Button
                        type="submit"
                        onClick={handleEmailSubmit}
                        className="btn btn-primary w-100"
                    >
                        Send Reset Link
                    </Button>

                    {/* </form> */}

                    <div className="other">
                        <p className="mt-3 text-center ">
                            Do you have an account?
                        </p>

                        <div>
                            <button
                                className="btn btn-link "
                                onClick={() => {
                                    navigate("/login");
                                }}
                            >
                                Login
                            </button>

                            <button
                                className="btn btn-link "
                                onClick={() => {
                                    navigate("/signup");
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
