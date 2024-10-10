// import
import { Outlet } from "react-router-dom";

// ui component
import ScrollTop from "../../ui/scrolltop/ScrollTop";
import Nav from "../../component/navbar/nav";
import Footer from "../../component/footer/footer";

function HomepageLayout() {
    return (
        <>
            <Nav />
            <ScrollTop />
            <Outlet />
            <Footer />
        </>
    );
}

export default HomepageLayout;
