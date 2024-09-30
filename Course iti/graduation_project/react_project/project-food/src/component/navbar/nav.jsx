import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./nav.css";

// bg-body-tertiary
function Nav() {
  return (
    <>
      <Navbar className="nav rounded  bg-body-tertiary" id="nav">

        <Link className="navbar-brand m-1" to="/">
          <img
            src="/logo-1.webp"  
            alt="Home Food Logo"
            className="d-inline-block align-top"
            style={{ height: '50px', width: 'auto' }} />
        </Link>


        {/* <input className="w-25 h-75 m-5 rounded border shadow"></input>
        <FontAwesomeIcon className="icon" icon={faSearch} size="1x" /> */}

        <div className="d-flex ms-auto ml-1">
            <Link className="nav-link border  h-100 rounded m-1 btn btn-outline-warning bg-org" to={"/"}>
              Home
            </Link>

            <Link className="nav-link border h-100 rounded m-1 btn btn-outline-warning bg-org" to={"/aboutus"}>
              About us
            </Link>

            <Link className="nav-link border h-100 rounded m-1 btn btn-outline-warning bg-org" to={"/vendors"}>
            Chefs
            </Link>

            <Link className="nav-link border h-100 rounded m-1 btn btn-outline-warning bg-org " to={"/login"}>
              Login
            </Link>
            
            <Link className="nav-link border h-100 rounded m-1 btn btn-outline-warning bg-org" to={"/register"}>
            Sign up
            </Link>
            
            

            <Link className="nav-link border h-100 rounded m-1 btn btn-outline-warning " to={"/cart"}>
              
              <FontAwesomeIcon className="bg-org" icon={faShoppingCart} size="2x" />
            </Link>
        </div>
     
      </Navbar>

    </>
  );
}
export default Nav;