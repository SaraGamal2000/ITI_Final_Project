import React from "react";

// import style
import "./ConfirmEmail.css";

// ui components
import ScrollToTopPages from "../scrolltotoppages/ScrollToTopPages";

// assests
import SuccessRegister from "../../assets/images/author/avatar.png";

function ConfirmEmail() {
    return (
        <>
            <ScrollToTopPages />
            <div className="confirmemail">
                <div className="container">
                    <div className="section-title">
                        <h1 className="h2">Confirm Email</h1>
                    </div>

                    <div className="content">
                        <div className="info">
                            <div className="image">
                                <img
                                    src={`${SuccessRegister}`}
                                    alt={`Registration`}
                                />
                            </div>
                            <div className="details">
                                <p className="h3">
                                    Registration successful! Please check your
                                    email to confirm your account.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ConfirmEmail;
