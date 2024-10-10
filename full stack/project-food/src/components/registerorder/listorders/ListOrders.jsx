import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import the 'js-cookie' library for managing cookies

// import styles
import "./ListOrders.css";

// ui bootstrap components
import { Button } from "react-bootstrap";

// plugin
import Toast from "../../../plugin/Toast";
import useUserData from "../../../plugin/useUserData";

// utils
import apiInstance from "../../../utils/axios";
import { App_User } from "../../../utils/constants";

// order components
import OrderComponents from "../ordercomponents/OrderComponents";

// ui components
import ScrollToTopPages from "../../../ui/scrolltotoppages/ScrollToTopPages";
import Loader from "../../../ui/loader/Loader";
import NotComponent from "../../../ui/error/NotComponent";

function ListOrders() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const userId = useUserData()?.user_id;
    const accessToken = Cookies.get("access_token");

    const fetchPosts = async () => {
        try {
            const response = await apiInstance.get(`productapi/lists/`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            setPosts(response.data);
            // console.log(`response.data>-`, response.data);
        } catch (error) {
            console.log(`${error}`);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Pagination
    const itemsPerPage = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const postItems = posts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(posts.length / itemsPerPage);
    const pageNumbers = Array.from(
        { length: totalPages },
        (_, index) => index + 1
    );

    if (!posts) return <Loader />;

    return (
        <>
            <ScrollToTopPages />
            <div className="listorders">
                <div className="container">
                    <div className="section-title">
                        <h2 className="h2">Products List</h2>
                    </div>

                    <div className="content">
                        <ul className="list">
                            {posts.length > 0 ? (
                                posts.map((project, index) => (
                                    <OrderComponents
                                        project={project}
                                        key={index}
                                    />
                                ))
                            ) : (
                                <NotComponent name="products" />
                            )}
                        </ul>
                    </div>

                    <div className="back">
                        <Button
                            className="btn update-btn"
                            onClick={() => {
                                navigate(`/${App_User}/profile`);
                            }}
                        >
                            Back to Profile
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListOrders;
