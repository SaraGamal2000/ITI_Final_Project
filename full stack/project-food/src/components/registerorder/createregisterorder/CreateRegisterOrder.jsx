import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

// import style
import "./CreateRegisterOrder.css";

// ui bootstrap components
import { Button } from "react-bootstrap";

// pluginx
import useUserData from "../../../plugin/useUserData";
import Toast from "../../../plugin/Toast";

// utils
import apiInstance from "../../../utils/axios";
import { App_User } from "../../../utils/constants";

// ui components
import ScrollToTopPages from "../../../ui/scrolltotoppages/ScrollToTopPages";
import Loader from "../../../ui/loader/Loader";

function CreateRegisterOrder() {
    const [post, setCreatePost] = useState({
        full_name: "",
        phone: "",

        title: "",
        description: "",
        governorate: "",
        price_per_unit: "",

        thumbnail: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",

        // image: "",
        tags: "",
        status: "Active",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useUserData()?.user_id;
    const navigate = useNavigate();

    const handleCreatePostChange = (event) => {
        setCreatePost({
            ...post,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChangeThumbnail = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        setCreatePost({
            ...post,
            thumbnail: {
                file: event.target.files[0],
                preview: reader.result,
            },
        });
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFileChangeImage1 = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        setCreatePost({
            ...post,
            image1: {
                file: event.target.files[0],
                preview: reader.result,
            },
        });
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleFileChangeImage2 = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        setCreatePost({
            ...post,
            image2: {
                file: event.target.files[0],
                preview: reader.result,
            },
        });
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleFileChangeImage3 = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        setCreatePost({
            ...post,
            image3: {
                file: event.target.files[0],
                preview: reader.result,
            },
        });
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleFileChangeImage4 = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        setCreatePost({
            ...post,
            image4: {
                file: event.target.files[0],
                preview: reader.result,
            },
        });
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        setCreatePost({
            ...post,
            image: {
                file: event.target.files[0],
                preview: reader.result,
            },
        });
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleCreatePost = async (e) => {
        setIsLoading(true);
        e.preventDefault();

        // console.log(post.category);

        const jsonData = {
            user_id: userId,
            title: post.title,
            description: post.description,
            price_per_unit: post.price_per_unit,

            thumbnail: post.thumbnail.file,
            image1: post.image1.file,
            image2: post.image2.file,
            image3: post.image3.file,
            image4: post.image4.file,
            // image: post.image.file,
            post_status: post.status,
            tags: post.tags,
        };

        const formdata = new FormData();

        formdata.append("user_id", userId);

        formdata.append("full_name", post.full_name);
        formdata.append("phone", post.phone);

        formdata.append("title", post.title);
        formdata.append("description", post.description);
        formdata.append("governorate", post.governorate);
        formdata.append("price_per_unit", post.price_per_unit);

        formdata.append("thumbnail", post.thumbnail.file);
        formdata.append("image1", post.image1.file);
        formdata.append("image2", post.image2.file);
        formdata.append("image3", post.image3.file);
        formdata.append("image4", post.image4.file);

        formdata.append("tags", post.tags);
        formdata.append("post_status", post.status);
        try {
            const response = await apiInstance.post(
                "productapi/create/",
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            setIsLoading(false);
            Swal.fire({
                icon: "success",
                title: "Package created successfully.",
            });
            Toast("success", "Order Created successfully!");
            navigate(`/${App_User}/profile`);
        } catch (error) {
            // console.log(error);
            setIsLoading(false);
            Toast("error", `Error: ${error}`, "");
        }
    };

    return (
        <>
            <ScrollToTopPages />
            <div className="createregisterorder">
                <div className="container">
                    <div className="section-title">
                        <h2 className="h2">Create Product</h2>
                    </div>

                    <div className="content">
                        <form
                            onSubmit={handleCreatePost}
                            encType="multipart/form-data"
                        >
                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="thumbnail"
                                >
                                    Thumbnail:
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="thumbnail"
                                    id="thumbnail"
                                    onChange={handleFileChangeThumbnail}
                                    accept="image/*"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="image1">
                                    Image1:
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image1"
                                    id="image1"
                                    onChange={handleFileChangeImage1}
                                    accept="image/*"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="image2">
                                    Image2:
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image2"
                                    id="image2"
                                    onChange={handleFileChangeImage2}
                                    accept="image/*"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="image3">
                                    Image3:
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image3"
                                    id="image3"
                                    onChange={handleFileChangeImage3}
                                    accept="image/*"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="image4">
                                    Image4:
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="image4"
                                    id="image4"
                                    onChange={handleFileChangeImage4}
                                    accept="image/*"
                                    required
                                />
                            </div>

                            <div className="">
                                <label
                                    className="form-label"
                                    htmlFor="full_name"
                                >
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="full_name"
                                    className="form-control"
                                    placeholder="Full Name"
                                    name="full_name"
                                    onChange={handleCreatePostChange}
                                    required=""
                                />
                            </div>

                            <div className="">
                                <label className="form-label" htmlFor="phone">
                                    phone
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="form-control"
                                    placeholder="Phone"
                                    name="phone"
                                    onChange={handleCreatePostChange}
                                    required=""
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="governorate"
                                >
                                    Governorate:
                                </label>
                                <input
                                    type="text"
                                    name="governorate"
                                    className="form-control"
                                    id="governorate"
                                    // value={post.title}
                                    onChange={handleCreatePostChange}
                                    placeholder="Governorate"
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label" htmlFor="title">
                                    Title:
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    id="title"
                                    // value={work.title}
                                    placeholder="Title"
                                    onChange={handleCreatePostChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="description"
                                >
                                    Description:
                                </label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    id="description"
                                    // value={work.details}
                                    onChange={handleCreatePostChange}
                                    required
                                    placeholder="Description"
                                ></textarea>
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="price_per_unit"
                                >
                                    Price:
                                </label>
                                <input
                                    type="number"
                                    name="price_per_unit"
                                    className="form-control"
                                    id="price_per_unit"
                                    // value={post.price_per_unit}
                                    onChange={handleCreatePostChange}
                                    required
                                    placeholder="price"
                                />
                            </div>

                            <div className="buttons">
                                <Button className="btn" type="submit">
                                    Add New Product
                                </Button>

                                <Button
                                    className="btn"
                                    type="button"
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

export default CreateRegisterOrder;
