/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

//
import "./AppUser.css";

// bootstrap components
import { Button } from "react-bootstrap";

// store
import { useAuthStore } from "../../store/auth";

//  plugin
import useUserData from "../../plugin/useUserData";
import Toast from "../../plugin/Toast";

// utils
import { App_User } from "../../utils/constants";
import apiInstance from "../../utils/axios";

// ui components
import Loader from "../../ui/loader/Loader";
import ScrollToTopPages from "../../ui/scrolltotoppages/ScrollToTopPages";

// assets
import ProfileImage from "../../assets/images/author/avatar.png";
import ErrorRegister from "../../assets/images/user/error-register.png";

function AppUser() {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({
        image: null,
        full_name: "",
        about: "",
        bio: "",
        facebook: "",
        twitter: "",
        country: "",
    });
    const userId = useUserData()?.user_id;

    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchProfile = () => {
        apiInstance.get(`user/profile/${userId}/`).then((res) => {
            setProfileData(res.data);
        });
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleProfileChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setProfileData({
            ...profileData,
            [event.target.name]: selectedFile,
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await apiInstance.get(`user/profile/${userId}/`);

        const formData = new FormData();
        if (profileData.image && profileData.image !== res.data.image) {
            formData.append("image", profileData.image);
        }
        formData.append("full_name", profileData.full_name);
        formData.append("about", profileData.about);
        formData.append("facebook", profileData.facebook);
        formData.append("twitter", profileData.twitter);
        formData.append("country", profileData.country);

        try {
            const res = await apiInstance.patch(
                `user/profile/${userId}/`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            Toast("success", "Profile updated successfully", "");
            setLoading(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            Toast("error", "An Error Occured", "");
        }
    };

    if (!profileData) return <Loader />;
    const { full_name, image, id, bio, phone, facebook, twitter } = profileData;
    const backup_bio =
        "Success is not measured by what you have achieved, but by the obstacles you have overcome.";
    const backup_phone = `01000000000`;
    // console.log(`profileData`, profileData);

    return (
        <>
            <ScrollToTopPages />
            <div className="userprofile">
                <div className="container">
                    <div className="section-title">
                        <h1 className="h2">User Profile</h1>
                    </div>

                    <div className={`content `}>
                        <div className="image">
                            <img
                                src={`${image || ProfileImage}`}
                                alt={`${full_name}`}
                            />
                        </div>

                        <div className="info">
                            <div className="details">
                                <p className="h3">
                                    Full Name:
                                    <span>{full_name}</span>
                                </p>

                                {/* <p className="h3">
                                    Phone:
                                    <span>
                                        {phone !== null &&
                                        phone !== "null" &&
                                        phone !== ""
                                            ? phone
                                            : backup_phone}
                                    </span>
                                </p> */}
                            </div>

                            <div className="buttons">
                                <Button
                                    className="btn "
                                    onClick={() => {
                                        navigate(
                                            `/${App_User}/updateprofile/${id}`
                                        );
                                    }}
                                >
                                    Update Profile
                                </Button>

                                <Button
                                    className="btn "
                                    onClick={() => {
                                        navigate(`/logout`);
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className={`categories `}>
                        <div className="section-title">
                            <h3 className="h3">Products</h3>
                        </div>

                        <div className="actions">
                            <Button
                                className="btn "
                                onClick={() => {
                                    navigate(
                                        `/${App_User}/createregisterorder`
                                    );
                                }}
                            >
                                <span>Create Product</span>
                            </Button>

                            <Button
                                className="btn "
                                onClick={() => {
                                    navigate(`/${App_User}/listorders`);
                                }}
                            >
                                <span>View Products</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AppUser;
