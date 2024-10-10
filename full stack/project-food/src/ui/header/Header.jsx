/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link as LinkScroll } from "react-scroll";

// bootstrap
import { Nav, Navbar } from "react-bootstrap";

// font awsome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilm,
    faHeart,
    faMoon,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import {} from "@fortawesome/fontawesome-svg-core";
import {} from "@fortawesome/free-brands-svg-icons";
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/react-fontawesome";

// context
import themeContext from "../../contexts/themeContext";
import languageContext from "../../contexts/languageContext";

// store
import { useAuthStore } from "../../store/auth";

// utils
import { App_User } from "../../utils/constants";

// assets
import logo from "../../assets/images/logo/logo.png";

function Header() {
    const { darkMode, setDarkMode } = useContext(themeContext);
    const { language, setLanguage } = useContext(languageContext);

    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate();

    // const access = localStorage.getItem("access");
    // authentication
    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setNavbar(false);
        });
    }, []);

    return (
        <>
            <div className="header">
                <div className="container">
                    <Link to={`/`} className="logo">
                        <i className="fas fa-utensils" />
                        <span>food</span>
                    </Link>

                    <div className="me">
                        <i id="menu-bar" className="fas fa-bars" />

                        <ul
                            className={`navbar ${
                                navbar !== false ? "active" : ""
                            }`}
                        >
                            <li>
                                <a href="#home">home</a>
                            </li>
                            <li>
                                <a href="#speciality">speciality</a>
                            </li>
                            <li>
                                <a href="#popular">popular</a>
                            </li>
                            <li>
                                <a href="#gallery">gallery</a>
                            </li>
                            <li>
                                <a href="#review">review</a>
                            </li>
                            <li>
                                <a href="#order">order</a>
                            </li>
                        </ul>

                        <div>
                            {isLoggedIn() && (
                                <button
                                    className="header-bottom-actions-btn"
                                    aria-label="Logout"
                                    title="Logout"
                                >
                                    <a
                                        onClick={() => {
                                            navigate(`/logout`);
                                        }}
                                    >
                                        <ion-icon name="log-out-outline" />
                                        {/* <span>Logout</span> */}
                                    </a>
                                </button>
                            )}

                            <button
                                className="header-bottom-actions-btn"
                                aria-label="Profile"
                            >
                                {isLoggedIn() ? (
                                    <a
                                        title="Profile"
                                        onClick={() => {
                                            navigate(`/${App_User}/profile`);
                                        }}
                                    >
                                        <ion-icon name="person-outline" />
                                        {/* <span>Profile</span> */}
                                    </a>
                                ) : (
                                    <a
                                        title="Login"
                                        onClick={() => {
                                            navigate(`/login`);
                                        }}
                                    >
                                        <ion-icon name="person-outline" />
                                        {/* <span>Login</span> */}
                                    </a>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <header className="header" data-header>
                <div
                    className={`overlay ${navbar !== false ? "active" : ""}`}
                    data-overlay
                ></div>

                <div className="header-bottom">
                    <div className="container">
                        <Link to={`/`} className="logo" title="homeverse">
                            <img src={`${logo}`} alt="Homeverse logo" />
                        </Link>

                        <nav
                            className={`navbar ${
                                navbar !== false ? "active" : ""
                            }`}
                            data-navbar
                        >
                            <div className="navbar-top">
                                <Link
                                    to={`/`}
                                    className="logo"
                                    title="homeverse"
                                >
                                    <img src={`${logo}`} alt="Homeverse logo" />
                                </Link>

                                <button
                                    className="nav-close-btn"
                                    data-nav-close-btn
                                    aria-label="Close Menu"
                                    onClick={() => {
                                        setNavbar(!navbar);
                                    }}
                                    title="Close Menu"
                                >
                                    <ion-icon name="close-outline" />
                                </button>
                            </div>

                            <div className="navbar-bottom">
                                <ul className="navbar-list">
                                    <li>
                                        <Link
                                            to={`/`}
                                            className="navbar-link"
                                            data-nav-link
                                            title="homeverse"
                                            onClick={() => {
                                                setNavbar(false);
                                            }}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/about`}
                                            className="navbar-link"
                                            data-nav-link
                                            title="About"
                                            onClick={() => {
                                                setNavbar(false);
                                            }}
                                        >
                                            About
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/servicepage"
                                            // href="#service"
                                            className="navbar-link"
                                            title="Service"
                                            onClick={() => {
                                                setNavbar(false);
                                            }}
                                        >
                                            Service
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/ourworkspage"
                                            className="navbar-link"
                                            title="Property"
                                            onClick={() => {
                                                setNavbar(false);
                                            }}
                                        >
                                            Our Works
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to={`/contact`}
                                            className="navbar-link"
                                            data-nav-link
                                            onClick={() => {
                                                setNavbar(false);
                                            }}
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>

                        <div className="header-bottom-actions">
                        

                            {isLoggedIn() && (
                                <button
                                    className="header-bottom-actions-btn"
                                    aria-label="Logout"
                                    title="Logout"
                                >
                                    <a
                                        onClick={() => {
                                            navigate(`/logout`);
                                        }}
                                    >
                                        <ion-icon name="log-out-outline" />
                                        <span>Logout</span>
                                    </a>
                                </button>
                            )}

                            <button
                                className="header-bottom-actions-btn"
                                aria-label="Profile"
                            >
                                {isLoggedIn() ? (
                                    <a
                                        title="Profile"
                                        onClick={() => {
                                            navigate(`/${App_User}/profile`);
                                        }}
                                    >
                                        <ion-icon name="person-outline" />
                                        <span>Profile</span>
                                    </a>
                                ) : (
                                    <a
                                        title="Login"
                                        onClick={() => {
                                            navigate(`/login`);
                                        }}
                                    >
                                        <ion-icon name="person-outline" />
                                        <span>Login</span>
                                    </a>
                                )}
                            </button>

                           

                            <button
                                className="header-bottom-actions-btn"
                                data-nav-open-btn
                                aria-label="Open Menu"
                                onClick={() => {
                                    setNavbar(!navbar);
                                }}
                                title="Menu"
                            >
                                <ion-icon name="menu-outline" />
                                <span>Menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header> */}
        </>
    );
}

export default Header;
