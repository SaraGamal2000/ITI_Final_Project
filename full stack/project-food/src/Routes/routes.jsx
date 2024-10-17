import { lazy, Suspense } from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useParams,
    Navigate,
    Router,
} from "react-router-dom";

import Nav from "../component/navbar/nav";
import Home_p from "../pages/home";
import Footer from "../component/footer/footer";
import Loader from "../ui/loader/Loader";
import { App_User } from "../utils/constants";
import AppUserLayout from "../pages/user/AppUserLayout";
import ProtectedRoute from "../ui/auth/ProtectedRoute";
import AppUser from "../pages/user/AppUser";
import UpdateProfile from "../pages/user/updateprofile/UpdateProfile";
import CreateRegisterOrder from "../components/registerorder/createregisterorder/CreateRegisterOrder";
import ListOrders from "../components/registerorder/listorders/ListOrders";
import DetailsOrder from "../components/registerorder/detailsorder/DetailsOrder";
import HomepageLayout from "../components/layouts/Homepagelayout";
import ConfirmEmail from "../ui/confirmemail/ConfirmEmail";
import ChangePassword from "../ui/changepassword/ChangePassword";
import Logout from "../ui/logout/Logout";

// const Homepage = lazy(() => import("../pages/home/homepage"));
// const Loginpage = lazy(() => import("./../pages/loginpage"));
// const Productpage = lazy(() => import("../pages/products/productpage"));
// const Register = lazy(() => import("../pages/registerpage"));
// const Cartpage = lazy(() => import("./../pages/cartpage"));
// const P_detail = lazy(() => import("./../pages/products/p_detail"));

const Homepage = lazy(() => import("../pages/home"));
const Loginpage = lazy(() => import("../pages/login"));
const Vendorspage = lazy(() => import("../pages/vedore"));
const Register = lazy(() => import("../pages/signup"));
const Cartpage = lazy(() => import("../pages/cart"));
const About_us = lazy(() => import("../pages/about_us"));
const ProductDetail = lazy(() => import("../pages/product_detail_p"));
const Profile = lazy(() => import("../pages/profile/profile"));
const ForgotPassword = lazy(() =>
    import("../pages/forgotpassword/forgotpassword")
);
const ResetPassword = lazy(() =>
    import("../pages/resetpassword/resetpassword")
);
const Order = lazy(() => import("../pages/order/order_paga"));

// const {id}=useParams();

export default function AppRoute() {
    return (
        <>
            <Suspense fallback={<Loader />}>
                <BrowserRouter>
                    <Routes>
                        {/* user */}
                        <Route
                            path={`/${App_User}`}
                            element={
                                <ProtectedRoute>
                                    <AppUserLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={
                                    <Navigate
                                        replace
                                        to={`${App_User}/profile`}
                                    />
                                }
                            />

                            <Route
                                exact
                                path={`/${App_User}`}
                                component={Router}
                            />
                            <Route path={`${App_User}`} element={<AppUser />} />
                            <Route
                                path={`/${App_User}/profile`}
                                element={<AppUser />}
                            />
                            <Route
                                path={`/${App_User}/${App_User}/profile`}
                                element={<AppUser />}
                            />
                            <Route
                                path={`/${App_User}profile`}
                                element={<AppUser />}
                            />
                            <Route
                                path={`/${App_User}-profile`}
                                element={<AppUser />}
                            />
                            <Route
                                path={`/${App_User}/${App_User}profile`}
                                element={<AppUser />}
                            />

                            {/* update profile */}
                            <Route
                                path={`/${App_User}/updateprofile/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/update/profile/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/update-profile/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/profile/update/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/profile-update/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/editprofile/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/edit-profile/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/edit/profile/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/profileedit/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/profile-edit/:id`}
                                element={<UpdateProfile />}
                            />
                            <Route
                                path={`/${App_User}/profile/edit/:id`}
                                element={<UpdateProfile />}
                            />

                            {/* register order */}
                            {/* create order */}
                            <Route
                                path={`/${App_User}/createregisterorder`}
                                element={<CreateRegisterOrder />}
                            />
                            <Route
                                path={`/${App_User}/create/registerorder`}
                                element={<CreateRegisterOrder />}
                            />
                            <Route
                                path={`/${App_User}/createregister/order`}
                                element={<CreateRegisterOrder />}
                            />
                            <Route
                                path={`/${App_User}/create/register/order`}
                                element={<CreateRegisterOrder />}
                            />
                            <Route
                                path={`/${App_User}/create-registerorder`}
                                element={<CreateRegisterOrder />}
                            />
                            <Route
                                path={`/${App_User}/createregister-order`}
                                element={<CreateRegisterOrder />}
                            />
                            <Route
                                path={`/${App_User}/create-register-order`}
                                element={<CreateRegisterOrder />}
                            />
                            <Route
                                path={`/${App_User}/create/register-order`}
                                element={<CreateRegisterOrder />}
                            />
                            <Route
                                path={`/${App_User}/create-register/order`}
                                element={<CreateRegisterOrder />}
                            />

                            {/* list order */}
                            <Route
                                path={`/${App_User}/listorders`}
                                element={<ListOrders />}
                            />

                            {/* details order */}
                            {/* <Route
                                path={`/${App_User}/detailsorder/:slug/`}
                                element={<DetailsOrder />}
                            /> */}
                            <Route
                                path={`/${App_User}/detailsorder/:slug/`}
                                element={<ProductDetail />}
                            />
                        </Route>

                        {/* web site */}
                        {/* <Nav /> */}
                        <Route path="/" element={<HomepageLayout />}>
                            <Route path="/" element={<Homepage />} />
                            <Route path="/vendors" element={<Vendorspage />} />
                            <Route path="/cart" element={<Cartpage />} />
                            <Route path="/aboutus" element={<About_us />} />
                         
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/order" element={<Order />} />

                            {/* Verify user */}
                            <Route path="/login" element={<Loginpage />} />
                            <Route path="/register" element={<Register />} />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                            <Route
                                path="/reset-password/:token"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="/confirmemail"
                                element={<ConfirmEmail />}
                            />
                            <Route
                                path="/resetpassword"
                                element={<ResetPassword />}
                            />
                            <Route
                                path="/changepassword"
                                element={<ChangePassword />}
                            />
                            <Route path="/logout" element={<Logout />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </Suspense>
        </>
    );
}
