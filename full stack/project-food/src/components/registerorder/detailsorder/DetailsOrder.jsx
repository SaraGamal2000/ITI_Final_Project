import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the 'js-cookie' library for managing cookies

// import style
import "./DetailsOrder.css";

// ui bootstrap components
import { Button } from "react-bootstrap";

// plugin
import Toast from "../../../plugin/Toast";

// utils
import apiInstance from "../../../utils/axios";
import { App_User } from "../../../utils/constants";

// ui component
import Loader from "../../../ui/loader/Loader";
import ScrollToTopPages from "../../../ui/scrolltotoppages/ScrollToTopPages";

function DetailsOrder() {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [tags, setTags] = useState([]);
    const accessToken = Cookies.get("access_token");

    const param = useParams();
    // console.log(param);

    const fetchPost = async () => {
        try {
            const response = await apiInstance.get(
                // `registerorder/detail/${param.slug}/`
                `productapi/admin/detail/${param.slug}/`
                // ,
                // {
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`,
                //     },
                // }
            );
            setPost(response.data);

            const tagArray = response.data?.tags?.split(",");
            setTags(tagArray);
            console.log(`333`, response.data);
        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    };

    useEffect(() => {
        fetchPost();
    }, []);

    if (!post) return <Loader />;
    // console.log(`333`, post);

    return (
        <>
            <ScrollToTopPages />
            <div className="detailsorder">
                <div className="container">
                    <div className="section-title">
                        <h2 className="h2">Order</h2>
                    </div>

                    <div className="content">
                        <div className="info">
                            <div className="details">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Info</th>
                                            <th>Content</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Full Name</td>
                                            <td>{post?.full_name}</td>
                                        </tr>
                                        <tr>
                                            <td>Phone</td>
                                            <td>{post?.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Governorate</td>
                                            <td>{post?.governorate}</td>
                                        </tr>
                                        <tr>
                                            <td>City</td>
                                            <td>{post?.city}</td>
                                        </tr>
                                        <tr>
                                            <td>The Area</td>
                                            <td>{post?.area}</td>
                                        </tr>
                                        <tr>
                                            <td>Type of Residential Unit</td>
                                            <td>{post?.typeunit}</td>
                                        </tr>
                                        <tr>
                                            <td>Required Works</td>
                                            <td>{post?.requiredworks}</td>
                                        </tr>
                                        <tr>
                                            <td>Skills</td>
                                            <td>{post?.skills}</td>
                                        </tr>
                                        <tr>
                                            <td>Condition of the Unit</td>
                                            <td>{post?.conditionoftheunit}</td>
                                        </tr>
                                        <tr>
                                            <td>Space</td>
                                            <td>{post?.space}</td>
                                        </tr>
                                        <tr>
                                            <td>Number of Rooms</td>
                                            <td>{post?.numberroom}</td>
                                        </tr>
                                        <tr>
                                            <td>Number of Bathrooms</td>
                                            <td>{post?.numberbathroom}</td>
                                        </tr>
                                        <tr>
                                            <td>Note</td>
                                            <td>{post?.description}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className="back">
                        <Button
                            className="btn update-btn"
                            onClick={() => {
                                navigate(`/${App_User}/listorders`);
                            }}
                        >
                            Back to List
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailsOrder;
