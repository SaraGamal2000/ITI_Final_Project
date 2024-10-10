import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import styles
import "./ListOrdersCompany.css";

// ui bootstrap components
import { Button } from "react-bootstrap";

// plugin
import Toast from "../../../plugin/Toast";
import useUserData from "../../../plugin/useUserData";

// utils
import apiInstance from "../../../utils/axios";
import { App_Company, App_User } from "../../../utils/constants";

// package components
// import OrderComponents from "../ordercomponents/OrderComponents";
import OrderComponentsCompany from "../ordercomponentscompany/OrderComponentsCompany";

// ui components
import ScrollToTopPages from "../../../ui/scrolltotoppages/ScrollToTopPages";
import Loader from "../../../ui/loader/Loader";
import NotComponent from "../../../ui/error/NotComponent";

function ListOrdersCompany() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const userId = useUserData()?.user_id;

    const fetchPosts = async () => {
        try {
            const response = await apiInstance.get(`productapi/admin/lists/`);
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
            <div className="listorderscompany">
                <div className="container">
                    <div className="section-title">
                        <h2 className="h2">Orders List</h2>
                    </div>

                    <div className="content">
                        <ul className="list">
                            {posts.length > 0 ? (
                                posts.map((project, index) => (
                                    <OrderComponentsCompany
                                        project={project}
                                        key={index}
                                    />
                                ))
                            ) : (
                                <NotComponent name="order" />
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

export default ListOrdersCompany;
