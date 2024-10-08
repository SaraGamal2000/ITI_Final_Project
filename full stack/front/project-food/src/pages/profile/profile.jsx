import React, { useEffect, useState } from 'react';
import authService from '../services/authService';

const Profile = () => {
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: ""
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            authService.getCurrentUser(token).then((response) => {
                setUserData(response.data);
            });
        }
    }, []);

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const response = await authService.updateUser(userData, token);
            alert('Profile updated');
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <div class='container'>
            <h2>Profile</h2>
            <form onSubmit={handleSubmit}>
                <label for="first_name">First Name:</label>
                <input type="text" name="first_name" value={userData.first_name} onChange={handleChange} /> <br/>
                <label for="last_name">Last Name:</label>
                <input type="text" name="last_name" value={userData.last_name} onChange={handleChange} /> <br/>
                <label for="email">Email:</label>
                <input type="email" name="email" value={userData.email} onChange={handleChange} /> <br/>
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
};

export default Profile;
