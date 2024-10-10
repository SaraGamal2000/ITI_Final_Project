/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {
    faFacebook,
    faInstagram,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CartIconComponent from "../cart/cart.jsx";
import { Row, Col, Container } from "react-bootstrap";
import "./nav.css";
import { useDispatch, useSelector } from "react-redux";
// import {CartQuantity}
import { CartQuantity } from "../../Redux/Action";
import { useAuthStore } from "../../store/auth.js";

// bg-body-tertiary
function Nav() {
    const quantity = useSelector((state) => state.CartQuantity);
    const update_quantity = useDispatch();

    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate();

    // const access = localStorage.getItem("access");
    // authentication
    // const [isLoggedIn, user] = useAuthStore((state) => [
    //     state.isLoggedIn,
    //     state.user,
    // ]);

    return (
        <>
            <Navbar
                sticky="top"
                className="nav rounded  bg-body-tertiary shadow bg-light"
                id="nav"
            >
                <Link className="navbar-brand m-1" to="/">
                    <img
                        src="/logo-1.webp"
                        alt="Home Food Logo"
                        className="d-inline-block align-top"
                        style={{ height: "50px", width: "auto" }}
                    />
                </Link>

                {/* <input className="w-25 h-75 m-5 rounded border shadow"></input>
        <FontAwesomeIcon className="icon" icon={faSearch} size="1x" /> */}

                <div className="d-flex ms-auto ml-1">
                    <Link
                        className="nav-link border  h-100 rounded m-1 btn btn-outline-warning bg-org"
                        to={"/"}
                    >
                        Home
                    </Link>

                    <Link
                        className="nav-link border h-100 rounded m-1 btn btn-outline-warning bg-org"
                        to={"/aboutus"}
                    >
                        About us
                    </Link>

                    <Link
                        className="nav-link border h-100 rounded m-1 btn btn-outline-warning bg-org"
                        to={"/vendors"}
                    >
                        Chefs
                    </Link>

                    <Link
                        className="nav-link border h-100 rounded m-1 btn btn-outline-warning bg-org "
                        to={"/login"}
                    >
                        Login
                    </Link>

                    <Link
                        className="nav-link border h-100 rounded m-1 btn btn-outline-warning bg-org"
                        to={"/register"}
                    >
                        Sign up
                    </Link>

                    {/* {isLoggedIn() && (
                        <Link
                            className="nav-link border h-100 rounded m-1 btn btn-outline-warning bg-org"
                            to={`/logout`}
                        >
                            logout
                        </Link>
                    )} */}

                    <Link
                        className="nav-link border h-100 rounded m-1 btn btn-outline-warning "
                        to={"/cart"}
                    >
                        <CartIconComponent />
                        <div>
                            <FontAwesomeIcon
                                className="bg-org"
                                icon={faShoppingCart}
                                size="2x"
                            />
                        </div>
                    </Link>
                </div>
            </Navbar>
        </>
    );
}
export default Nav;
