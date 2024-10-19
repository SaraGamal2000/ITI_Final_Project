import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useParams for getting the user ID
import api from "../../../utils/api"; // Axios instance

const AddUser = () => {
    const { id } = useParams(); // Get the user ID from the URL, if editing
    const [formData, setFormData] = useState({
        type: "customer",
        name: "",
        phone: "",
        email: "",
        password: "",
        address: "",
    });
    const navigate = useNavigate(); // For navigation after submitting

    useEffect(() => {
        // If there's an ID, fetch the existing user data for editing
        if (id) {
            api.get(`users/${id}/`)
                .then((res) => {
                    setFormData({
                        type: res.data.type,
                        name: res.data.name,
                        phone: res.data.phone,
                        email: res.data.email,
                        password: "", // Don't populate password for security reasons
                        address: res.data.address,
                    });
                })
                .catch((err) => console.error("Error fetching user:", err));
        }
    }, [id]); // Only run the effect when the ID changes

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id) {
            // If there's an ID, we're editing, so send a PUT request
            api.put(`users/${id}/`, formData)
                .then(() => {
                    alert("User updated successfully!");
                    navigate("/"); // Navigate back to the user list after editing
                })
                .catch((err) => console.error("Error updating user:", err));
        } else {
            // If there's no ID, we're adding a new user, so send a POST request
            api.post("users/", formData)
                .then(() => {
                    alert("User added successfully!");
                    navigate("/"); // Navigate back to the user list after adding
                })
                .catch((err) => console.error("Error adding user:", err));
        }
    };

    return (
        <div>
            <h2>{id ? "Edit User" : "Add New User"}</h2>
            <form onSubmit={handleSubmit}>
                <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    style={{ width: "90%" }}
                    required
                >
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                <br />
                <br />
                <input
                    style={{ width: "90%", padding: "5px" }}
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <input
                    style={{ width: "90%", padding: "5px" }}
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <input
                    style={{ width: "90%", padding: "5px" }}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <input
                    style={{ width: "90%", padding: "5px" }}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required={!id} // Password is required only when adding a new user
                />
                <br />
                <br />
                <textarea
                    style={{ width: "90%", padding: "5px" }}
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <br />
                <br />
                <button
                    type="submit"
                    style={{
                        padding: "10px 20px",
                        backgroundColor: "orange",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        fontWeight: "bold",
                    }}
                >
                    {id ? "Update User" : "Add User"}
                </button>
            </form>
        </div>
    );
};

export default AddUser;

//import React, { useState } from 'react';
//import api from '../../api';  // Axios instance
//import { useNavigate } from 'react-router-dom';  // To redirect after form submission
//
//const AddUser = () => {
//    const [formData, setFormData] = useState({
//        type: "customer",
//        name: "",
//        phone: "",
//        email: "",
//        password: "",
//        address: "",
//    });
//    const navigate = useNavigate();  // For navigation after submitting
//
//    const handleChange = (e) => {
//        setFormData({
//            ...formData,
//            [e.target.name]: e.target.value,
//        });
//    };
//
//    const handleSubmit = (e) => {
//        e.preventDefault();
//
//        // Make a POST request to add a new user
//        api.post('users/', formData)
//            .then(() => {
//                alert('User added successfully!');
//                navigate('/');  // Redirect back to UserList after submission
//            })
//            .catch(err => console.error(err));
//    };
//
//    return (
//        <div>
//            <h2>Add New User</h2>
//            <form onSubmit={handleSubmit}>
//                <select
//                    name="type"
//                    value={formData.type}
//                    onChange={handleChange}
//                    style={{ width: "90%" }}
//                    required
//                >
//                    <option value="customer">Customer</option>
//                    <option value="admin">Admin</option>
//                </select>
//                <br /><br />
//                <input
//                    style={{ width: "90%", padding: "5px" }}
//                    type="text"
//                    name="name"
//                    placeholder="Name"
//                    value={formData.name}
//                    onChange={handleChange}
//                    required
//                />
//                <br /><br />
//                <input
//                    style={{ width: "90%", padding: "5px" }}
//                    type="text"
//                    name="phone"
//                    placeholder="Phone"
//                    value={formData.phone}
//                    onChange={handleChange}
//                    required
//                />
//                <br /><br />
//                <input
//                    style={{ width: "90%", padding: "5px" }}
//                    type="email"
//                    name="email"
//                    placeholder="Email"
//                    value={formData.email}
//                    onChange={handleChange}
//                    required
//                />
//                <br /><br />
//                <input
//                    style={{ width: "90%", padding: "5px" }}
//                    type="password"
//                    name="password"
//                    placeholder="Password"
//                    value={formData.password}
//                    onChange={handleChange}
//                    required
//                />
//                <br /><br />
//                <textarea
//                    style={{ width: "90%", padding: "5px" }}
//                    name="address"
//                    placeholder="Address"
//                    value={formData.address}
//                    onChange={handleChange}
//                    required
//                />
//                <br /><br />
//                <button
//                    type="submit"
//                    style={{
//                        padding: "10px 20px",
//                        backgroundColor: "orange",
//                        color: "white",
//                        borderRadius: "5px",
//                        border: "none"
//                    }}
//                >
//                    Add User
//                </button>
//            </form>
//        </div>
//    );
//};
//
//export default AddUser;
