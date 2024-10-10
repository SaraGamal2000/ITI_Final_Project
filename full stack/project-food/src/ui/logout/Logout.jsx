// import
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

// utils
import { logout } from "../../utils/auth";

function Logout() {
    // localStorage.clear();
    useEffect(() => {
        logout();
    }, []);
    // localStorage.setItem("active", false);
    return <Navigate to={`/login`} />;
}

export default Logout;
