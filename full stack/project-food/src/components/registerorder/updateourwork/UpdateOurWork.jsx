import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie"; // Import the 'js-cookie' library for managing cookies

// ui bootstrap components
import { Button } from "react-bootstrap";

// plugin
import useUserData from "../../../plugin/useUserData";
import Toast from "../../../plugin/Toast";

// utils
import apiInstance from "../../../utils/axios";
import { App_Company } from "../../../utils/constants";

// ui components
import ScrollToTopPages from "../../../ui/scrolltotoppages/ScrollToTopPages";

function UpdateOurWork() {
    const [post, setEditPost] = useState({
        title: "",
        description: "",
        thumbnail: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        tags: "",
        status: "Active",
    });
    const [imagePreview, setImagePreview] = useState("");
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useUserData()?.user_id;
    const navigate = useNavigate();
    const param = useParams();
    const accessToken = Cookies.get("access_token");

    console.log(`#`, param);

    const fetchPost = async () => {
        try {
            const response = await apiInstance.get(
                `ourwork/detail/${param.slug}/`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            setEditPost(response.data);
        } catch (error) {
            Toast("error", `Failed to load Package ${error}`, "");
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    const handleCreatePostChange = (event) => {
        setEditPost({
            ...post,
            [event.target.name]: event.target.value,
        });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const reader = new FileReader();

        setEditPost({
            ...post,
            thumbnail: {
                file: event.target.files[0],
                preview: reader.result,
            },
            image1: {
                file: event.target.files[0],
                preview: reader.result,
            },
            imag2: {
                file: event.target.files[0],
                preview: reader.result,
            },
            image3: {
                file: event.target.files[0],
                preview: reader.result,
            },
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

    const handleCreatePost = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (!post.title) {
            Toast("error", "All Fields Are Required To Create A Work");
            setIsLoading(false);
            return;
        }

        // console.log(post.category);

        const jsonData = {
            title: post.title,
            // image: post.image.file,
            description: post.description,
            tags: post.tags,
            // category: post.category,
            post_status: post.status,
        };

        const formdata = new FormData();

        formdata.append("user_id", userId);
        formdata.append("title", post.title);
        formdata.append("description", post.description);

        formdata.append("thumbnail", post.thumbnail.file);
        formdata.append("image1", post.image1.file);
        formdata.append("image2", post.image2.file);
        formdata.append("image3", post.image3.file);
        formdata.append("image4", post.image4.file);

        formdata.append("tags", post.tags);
        formdata.append("post_status", post.status);
        try {
            const response = await apiInstance.patch(
                `ourwork/update/${userId}/${post?.id}/`,
                formdata,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            setIsLoading(false);
            Swal.fire({
                icon: "success",
                title: "Package Updated successfully.",
            });
            Toast("success", "Work Updated successfully!");
            navigate(`/${App_Company}/listourwork`);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <ScrollToTopPages />
            <div className="createproject">
                <div className="container">
                    <div className="section-title">
                        <h2 className="h2">Update Work</h2>
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
                                    onChange={handleFileChange}
                                    accept="image/*"
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
                                    onChange={handleFileChange}
                                    accept="image/*"
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
                                    onChange={handleFileChange}
                                    accept="image/*"
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
                                    onChange={handleFileChange}
                                    accept="image/*"
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
                                    onChange={handleFileChange}
                                    accept="image/*"
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
                                    value={post.title}
                                    onChange={handleCreatePostChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label
                                    className="form-label"
                                    htmlFor="description"
                                >
                                    description:
                                </label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    id="description"
                                    value={post.description}
                                    onChange={handleCreatePostChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="buttons">
                                <Button className="btn" type="submit">
                                    Save Changes
                                </Button>

                                <Button
                                    className="btn"
                                    type="button"
                                    onClick={() => {
                                        navigate(`/${App_Company}/listourwork`);
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

export default UpdateOurWork;
