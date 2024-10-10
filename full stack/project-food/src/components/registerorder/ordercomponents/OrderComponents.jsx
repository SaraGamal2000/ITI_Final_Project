import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie"; // Import the 'js-cookie' library for managing cookies

// bootstrap components
import { Button } from "react-bootstrap";

// plugin
import Toast from "../../../plugin/Toast";
import useUserData from "../../../plugin/useUserData";

// utils
import apiInstance from "../../../utils/axios";
import { App_User } from "../../../utils/constants";

// ui components
import Loader from "../../../ui/loader/Loader";

function OrderComponents({ project: packagecomponents }) {
    const navigate = useNavigate();
    const userId = useUserData()?.user_id;
    const param = useParams();
    const { id, title, full_name, typeunit } = packagecomponents;
    console.log(`-->`, packagecomponents);
    const accessToken = Cookies.get("access_token");

    const [projects, setProjects] = useState([]);
    const [project, setProject] = useState({
        title: "",
        details: "",
        image: null,
        slug: "",
    });

    //
    const fetchProjects = async () => {
        try {
            const response = await apiInstance.get("project/list/");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    // Handle deletion of a project
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "This will permanently delete the order!",
            icon: "warning",
            showCancelButton: true,
        });
        if (confirm.isConfirmed) {
            try {
                await apiInstance.delete(`productapi/delete/${userId}/${id}/`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                Toast("success", "Order deleted successfully!");
                fetchProjects();
                navigate(`/${App_User}/profile`);
            } catch (error) {
                Toast("error", `Error while deleting project! ${error}`);
            }
        }
    };

    if (!packagecomponents) return <Loader />;
    // console.log(`233`, packagecomponents);
    const { slug } = packagecomponents;

    return (
        <>
            <li className="item">
                <div className="info">
                    {/* <span className="id">{id})</span> */}

                    <span className="title">
                        {full_name} ({title})
                    </span>
                </div>

                <div className="buttons">
                    <Button
                        className="btn view-btn"
                        onClick={() => {
                            // window.open(`/detailsproject/${slug}`, "_blank")
                            // navigate(`/${App_User}/detailsorder/${slug}`);
                            navigate(`/detailsproject/${slug}`);
                        }}
                    >
                        View
                    </Button>
                    {/* <Button
                        className="btn update-btn"
                        onClick={() => {
                            navigate(`/${App_Company}/updateproject/${id}`);
                        }}
                    >
                        Update
                    </Button> */}
                    <Button
                        className="btn delete-btn"
                        onClick={() => {
                            handleDelete(id);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            </li>
        </>
    );
}

export default OrderComponents;
