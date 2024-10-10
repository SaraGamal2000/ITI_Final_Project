import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//
import "./UpdateProfile.css";

// authorization
import useUserData from "../../../plugin/useUserData";

//
import Toast from "../../../plugin/Toast";

// utils
import apiInstance from "../../../utils/axios";
import ScrollToTopPages from "../../../ui/scrolltotoppages/ScrollToTopPages";
import { App_User } from "../../../utils/constants";

// ui bootstrap
import { Button } from "react-bootstrap";

// ui components
import Loader from "../../../ui/loader/Loader";

function UpdateProfile() {
    const navigate = useNavigate();

    // =================================================================
    const [profileData, setProfileData] = useState({
        image: null,
        full_name: "",
        about: "",
        phone: "",
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
        const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];

        if (selectedFile && validImageTypes.includes(selectedFile.type)) {
            setProfileData({
                ...profileData,
                [event.target.name]: selectedFile,
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setProfileData({
                ...profileData,
                [event.target.name]: null,
            });
            setImagePreview("");
            Toast(
                "error",
                "Please upload a valid image file (JPEG or PNG or JPEG)",
                ""
            );
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!profileData.image) {
            setLoading(false);
            Toast(
                "error",
                "Please upload a valid image file before submitting.",
                ""
            );
            // alert("Please upload a valid image file before submitting.");
            return;
        }

        const res = await apiInstance.get(`user/profile/${userId}/`);

        const formData = new FormData();
        if (profileData.image && profileData.image !== res.data.image) {
            formData.append("image", profileData.image);
        }
        formData.append("full_name", profileData.full_name);
        formData.append("bio", profileData.bio);
        formData.append("phone", profileData.phone);
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
            navigate(`/${App_User}/profile`);
        } catch (error) {
            console.error("Error updating profile:", error);
            Toast(
                "error",
                `${error.response.data.phone} An Error Occured Verify data`,
                ""
            );
        }
    };

    if (!profileData) return <Loader />;

    return (
        <>
            <ScrollToTopPages />
            <div className="editprofile">
                <div className="container">
                    <div className="section-title">
                        <h1 className="h2">Update Profile</h1>
                    </div>

                    <div className="content">
                        <form className="card-body" onSubmit={handleFormSubmit}>
                            <div className="top">
                                <div className="image">
                                    <img
                                        src={imagePreview || profileData?.image}
                                        id="img-uploaded"
                                        className="avatar-xl rounded-circle"
                                        alt="avatar"
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>

                                <div className="">
                                    <label
                                        className="form-label"
                                        htmlFor="avatar"
                                    >
                                        Your Avatar
                                    </label>

                                    <input
                                        id="avatar"
                                        type="file"
                                        name="image"
                                        className="form-control mt-3"
                                        onChange={handleFileChange}
                                    />

                                    <p className="error">
                                        PNG or JPG no bigger than 800px wide and
                                        tall.
                                    </p>
                                </div>
                            </div>

                            <hr className="" />

                            {/* Form */}
                            <div className="info">
                                {/* First name */}
                                <div className="">
                                    <label
                                        className="form-label"
                                        htmlFor="fullname"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="fullname"
                                        className="form-control"
                                        placeholder="Full Name"
                                        onChange={handleProfileChange}
                                        name="full_name"
                                        value={
                                            profileData?.full_name !== null &&
                                            profileData?.full_name !== "null" &&
                                            profileData.full_name !== undefined
                                                ? profileData?.full_name
                                                : ""
                                        }
                                        required=""
                                    />
                                </div>

                                {/* phone */}
                                <div className="">
                                    <label
                                        className="form-label"
                                        htmlFor="phone"
                                    >
                                        phone
                                    </label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="form-control"
                                        placeholder="Phone"
                                        value={
                                            profileData?.phone !== null &&
                                            profileData.phone !== "null" &&
                                            profileData?.phone !== undefined
                                                ? profileData?.phone
                                                : ""
                                        }
                                        onChange={handleProfileChange}
                                        name="phone"
                                        required=""
                                    />
                                </div>

                                {/* Bio */}
                                <div className="">
                                    <label className="form-label" htmlFor="bio">
                                        Bio
                                    </label>
                                    <input
                                        type="text"
                                        id="bio"
                                        className="form-control"
                                        placeholder="Bio"
                                        value={
                                            profileData?.bio !== null &&
                                            profileData.bio !== "null" &&
                                            profileData?.bio !== undefined
                                                ? profileData?.bio
                                                : ""
                                        }
                                        onChange={handleProfileChange}
                                        name="bio"
                                        required=""
                                    />
                                </div>

                                {/* Ggovernorate */}
                                <div className="">
                                    <label
                                        className="form-label"
                                        htmlFor="governorate"
                                    >
                                        Governorate
                                    </label>
                                    <input
                                        type="text"
                                        id="governorate"
                                        className="form-control"
                                        value={
                                            profileData?.country !== null &&
                                            profileData?.country !== "null" &&
                                            profileData?.country !== undefined
                                                ? profileData?.country
                                                : ""
                                        }
                                        placeholder="Governorate"
                                        onChange={handleProfileChange}
                                        name="country"
                                        required=""
                                    />
                                </div>

                                {/* Facebook */}
                                <div className="">
                                    <label
                                        className="form-label"
                                        htmlFor="facebook"
                                    >
                                        Facebook
                                    </label>

                                    <input
                                        type="text"
                                        id="facebook"
                                        className="form-control"
                                        name="facebook"
                                        placeholder="Facebook"
                                        value={
                                            profileData?.facebook !== null &&
                                            profileData?.facebook !== "null" &&
                                            profileData?.facebook !== undefined
                                                ? profileData.facebook
                                                : ""
                                        }
                                        onChange={handleProfileChange}
                                        required=""
                                    />
                                </div>

                                {/* Twitter */}
                                <div className="">
                                    <label
                                        className="form-label"
                                        htmlFor="twitter"
                                    >
                                        Twitter
                                    </label>
                                    <input
                                        type="text"
                                        id="twitter"
                                        className="form-control"
                                        placeholder="Twitter"
                                        required=""
                                        value={
                                            profileData?.twitter !== null &&
                                            profileData?.twitter !== "null" &&
                                            profileData?.twitter !== undefined
                                                ? profileData?.twitter
                                                : ""
                                        }
                                        onChange={handleProfileChange}
                                        name="twitter"
                                    />
                                </div>
                            </div>

                            {/* Button */}
                            <div className="buttons">
                                <Button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Update Profile
                                </Button>

                                <Button
                                    className="btn btn-primary"
                                    type="submit"
                                    onClick={() => {
                                        navigate(`/${App_User}/profile`);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UpdateProfile;
