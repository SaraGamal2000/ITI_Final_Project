import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

// bootstrap components
import { Button } from "react-bootstrap";

// plugin
import Toast from "../../../plugin/Toast";
import useUserData from "../../../plugin/useUserData";

// utils
import apiInstance from "../../../utils/axios";
import { App_Company, App_User } from "../../../utils/constants";

// ui components
import Loader from "../../../ui/loader/Loader";

function OrderComponentsCompany({ project: packagecomponents }) {
    const navigate = useNavigate();
    const userId = useUserData()?.user_id;
    const param = useParams();

    const { id, title, full_name } = packagecomponents;
    // console.log(`-->`, packagecomponents);

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

    if (!packagecomponents) return <Loader />;
    // console.log(`233`, packagecomponents);
    const { slug } = packagecomponents;

    return (
        <>
            <li className="item">
                <div className="info">
                    <span className="id">{id})</span>

                    <span className="title">
                        {full_name} ({title})
                    </span>
                </div>

                <div className="buttons">
                    <Button
                        className="btn view-btn"
                        onClick={() => {
                            // window.open(`/detailsproject/${slug}`, "_blank")
                            navigate(`/${App_Company}/detailsorder/${slug}`);
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
                    {/* <Button
                        className="btn delete-btn"
                        onClick={() => {
                            handleDelete(id);
                        }}
                    >
                        Delete
                    </Button> */}
                </div>
            </li>
        </>
    );
}

export default OrderComponentsCompany;
