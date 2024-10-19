// import
import { Outlet } from "react-router-dom";

// ui component
import Footer from "../../component/footer/footer";
import Nav from "../../component/navbar/nav";

function AppAdminLayout() {
    return (
        <>
            {/* <Nav /> */}
            <Outlet />
            {/* <Footer /> */}
        </>
    );
}

export default AppAdminLayout;
