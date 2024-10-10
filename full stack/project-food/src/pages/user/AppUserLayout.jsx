// import
import { Outlet } from "react-router-dom";
import Nav from "../../component/navbar/nav";
import Footer from "../../component/footer/footer";

// ui component
function AppUserLayout() {
    return (
        <>
            {/* <Information /> */}
            <Nav />
            <Outlet />
            <Footer />
        </>
    );
}

export default AppUserLayout;
