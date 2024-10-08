// import React from "react";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Login_p() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/token/", {
        username: email,
        password: password,
      });
      localStorage.setItem("token", response.data.access);
      alert("Login successful");
    } catch (error) {
      console.log(error);
      alert("Login failed");
    }
  };

  return (
    <div class="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label for="email">Email:</label>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />{" "}
        <br />
        <label for="password">Password:</label>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        <br />
        <button type="submit">
          <Link to={"/profile"}></Link>
          Login
        </button>
      </form>
    </div>
  );
}
export default Login_p;
