// @ts-nocheck
import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    LinearProgress,
    useTheme,
} from "@mui/material";
import FoodIcon from "@mui/icons-material/Restaurant";
import CategoryIcon from "@mui/icons-material/Category";
import UserIcon from "@mui/icons-material/People";
import CookIcon from "@mui/icons-material/EmojiFoodBeverage";
import api from "../../utils/api";
import Loader from "../../ui/loader/Loader";
import apiInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import useUserData from "../../plugin/useUserData";
import Cookies from "js-cookie"; // Import the 'js-cookie' library for managing cookies

const LandingPage = () => {
    const [foodCount, setFoodCount] = useState(0);
    const [categoryCount, setCategoryCount] = useState(0);
    const [userCount, setUserCount] = useState(0);

    const theme = useTheme();

    // const fetchCounts = () => {
    //     api.get("foods/")
    //         .then((res) => setFoodCount(res.data.length))
    //         .catch((err) => console.error(err));

    //     api.get("categories/")
    //         .then((res) => setCategoryCount(res.data.length))
    //         .catch((err) => console.error(err));

    //     api.get("users/")
    //         .then((res) => setUserCount(res.data.length))
    //         .catch((err) => console.error(err));
    // };

    // useEffect(() => {
    //     fetchCounts();
    // }, []);
    // =================================================================

    // =================================================================
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [popularPosts, setPopularPosts] = useState([]);
    const [category, setCategory] = useState([]);
    const userId = useUserData()?.user_id;
    const accessToken = Cookies.get("access_token");

    const fetchPosts = async () => {
        try {
            const response = await apiInstance.get(
                `productapi/admin/lists/`
                //     , {
                //     headers: {
                //         Authorization: `Bearer ${accessToken}`,
                //     },
                // }
            );
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
    console.log(posts.length);

    return (
        <div style={{ padding: "10px" }}>
            {/* Welcome Card */}
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={8}>
                    <Card
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary,
                            textAlign: "center",
                            padding: "40px 30px",
                            width: "100%",
                        }}
                    >
                        <CardContent>
                            <Avatar
                                sx={{
                                    margin: "0 auto",
                                    backgroundColor: "white",
                                    color: theme.palette.primary.main,
                                    width: 120,
                                    height: 120,
                                }}
                            >
                                {" "}
                                {/* Increased avatar size */}
                                <CookIcon sx={{ fontSize: 70 }} />
                            </Avatar>
                            <Typography variant="h4" sx={{ marginTop: "20px" }}>
                                Welcome to HomeBites!
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ marginTop: "10px" }}
                            >
                                Manage your food items, categories, and users
                                with ease.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Statistic Cards */}
            <Grid
                container
                spacing={2}
                justifyContent="center"
                sx={{
                    marginLeft: "10px",
                    marginRight: "10px",
                    marginTop: "20px",
                }}
            >
                {/* Left Statistic Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            height: "300px",
                            width: "100%",
                            color: theme.palette.text.primary,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">Total Foods</Typography>
                            <FoodIcon
                                sx={{
                                    fontSize: 50,
                                    color: theme.palette.primary.main,
                                }}
                            />
                            <Typography variant="h4" sx={{ marginTop: "10px" }}>
                                {/* {foodCount} */}
                                {posts?.length}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                backgroundColor="blue"
                                value={(foodCount / 100) * 100}
                                sx={{
                                    marginTop: "15px",
                                    height: "10px",
                                    borderRadius: "5px",
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Middle Statistic Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            height: "300px",
                            width: "100%",
                            color: theme.palette.text.primary,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">
                                Total Categories
                            </Typography>
                            <CategoryIcon
                                sx={{
                                    fontSize: 50,
                                    color: theme.palette.secondary.main,
                                }}
                            />
                            <Typography variant="h4" sx={{ marginTop: "10px" }}>
                                {categoryCount}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={(categoryCount / 100) * 100}
                                sx={{
                                    marginTop: "15px",
                                    height: "10px",
                                    borderRadius: "5px",
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Right Statistic Card */}
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            height: "300px",
                            width: "100%",
                            color: theme.palette.text.primary,
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6">Total Users</Typography>
                            <UserIcon
                                sx={{
                                    fontSize: 50,
                                    color: theme.palette.success.main,
                                }}
                            />
                            <Typography variant="h4" sx={{ marginTop: "10px" }}>
                                {userCount}
                            </Typography>
                            <LinearProgress
                                variant="determinate"
                                value={(userCount / 100) * 100}
                                sx={{
                                    marginTop: "15px",
                                    height: "10px",
                                    borderRadius: "5px",
                                }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default LandingPage;
