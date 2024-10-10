import React, { useState } from "react";

// import style
import "./Contact.css";

// components
import Footer from "../footer/Footer";

// ui component
import ScrollToTopPages from "../scrolltotoppages/ScrollToTopPages";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // console.log(formData);
    };

    return (
        <>
            <ScrollToTopPages />
            <div className="contact">
                <div className="container">
                    <div className="section-title">
                        <h1 className="h2">Cantact</h1>
                    </div>

                    <form
                        action="https://formspree.io/f/mdknqegy"
                        method="POST"
                        // onSubmit={handleSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                required
                            />
                        </div>

                        <button className="btn" type="submit">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Contact;
