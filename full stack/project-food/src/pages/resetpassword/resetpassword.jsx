import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiInstance from "../../utils/axios";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import "./resetpassword.css";

const ResetPassword = () => {
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [message, setMessage] = useState("");
    // const [error, setError] = useState("");
    // const { token } = useParams();
    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (password !== confirmPassword) {
    //         setError("Passwords do not match");
    //         return;
    //     }
    //     setMessage("");
    //     setError("");
    //     try {
    //         const response = await axios.post(`/api/reset_password/${token}/`, {
    //             password,
    //             confirmPassword,
    //         });
    //         setMessage(response.data.details);
    //         navigate.push("/login");
    //     } catch (err) {
    //         setError(
    //             err.response.data.error ||
    //                 "Something went wrong. Please try again."
    //         );
    //     }
    // };
    // =================================================================
    //
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
                <div className="container">
                    <h2>Reset Password</h2>
                    <div className="content">
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

                        <Button
                            type="submit"
                            onClick={handleEmailSubmit}
                            className="btn btn-primary w-100"
                        >
                            Send Reset Link
                        </Button>
                    </div>
                </div>
                {/* {message && <p style={{ color: "green" }}>{message}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Reset Password</button>
                </form> */}
            </div>
        </>
    );
};

export default ResetPassword;
