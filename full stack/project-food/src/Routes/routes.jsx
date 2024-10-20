import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../ui/auth/ProtectedRoute";
import ProtectedRouteCompany from "../ui/auth/ProtectedRouteCompany";
import Loader from "../ui/loader/Loader";
import { App_Admin, App_Company, App_User } from "../utils/constants";

// Layouts
import HomepageLayout from "../components/layouts/Homepagelayout";
import AppAdminLayout from "../pages/admin/AppAdminLayout";
import AppUserLayout from "../pages/user/AppUserLayout";

// Admin Pages
import AppAdmin from "../pages/admin/AppAdmin";
import CategoryList from "../component/admin/CategoryList";
import FoodList from "../component/admin/FoodList";
import AddFood from "../component/admin/Forms/AddFood";
import UserList from "../component/admin/UserList";
import AddCategory from "../component/admin/Forms/AddCategory";
import AddUser from "../component/admin/Forms/AddUser";
import SearchResults from "../component/admin/SearchResults";
import LandingPage from "../component/admin/LandingPage";

// User Pages
import AppUser from "../pages/user/AppUser";
import UpdateProfile from "../pages/user/updateprofile/UpdateProfile";
import CreateRegisterOrder from "../components/registerorder/createregisterorder/CreateRegisterOrder";
import ListOrders from "../components/registerorder/listorders/ListOrders";
import ProductDetail from "../pages/product_detail_page";

// Main App Pages (Public Pages)
const Homepage = lazy(() => import("../pages/home"));
const Loginpage = lazy(() => import("../pages/login"));
const Vendorspage = lazy(() => import("../pages/vedore"));
const Register = lazy(() => import("../pages/signup"));
const Cartpage = lazy(() => import("../pages/cart"));
const About_us = lazy(() => import("../pages/about_us"));
const Profile = lazy(() => import("../pages/profile/profile"));
const ForgotPassword = lazy(() =>
    import("../pages/forgotpassword/forgotpassword")
);
const ResetPassword = lazy(() =>
    import("../pages/resetpassword/resetpassword")
);
const Order = lazy(() => import("../pages/order/order_paga"));
const ConfirmEmail = lazy(() => import("../ui/confirmemail/ConfirmEmail"));
const ChangePassword = lazy(() =>
    import("../ui/changepassword/ChangePassword")
);
const Logout = lazy(() => import("../ui/logout/Logout"));
const SuccessPage = lazy (() => import("../pages/payment-success"));
const CancelPage = lazy (() => import("../pages/payment-cancel"));

export default function AppRoute() {
    return (
        <Suspense fallback={<Loader />}>
            <BrowserRouter>
                <Routes>
                    {/* ========== Admin Dashboard Routes ========== */}
                    <Route
                        path={`${App_Admin}`}
                        element={
                            <ProtectedRouteCompany>
                                <AppAdminLayout />
                            </ProtectedRouteCompany>
                        }
                    >
                        {/* Admin Dashboard Routes */}
                        <Route
                            index
                            element={
                                <Navigate replace to={`${App_Admin}/profile`} />
                            }
                        />
                        <Route path="profile" element={<AppAdmin />} />
                        <Route path="landing-page" element={<LandingPage />} />
                        <Route
                            path="category-list"
                            element={<CategoryList />}
                        />
                        <Route path="food-list" element={<FoodList />} />
                        <Route path="add-food" element={<AddFood />} />
                        <Route path="users-list" element={<UserList />} />
                        <Route path="add-category" element={<AddCategory />} />
                        <Route path="add-user" element={<AddUser />} />
                        <Route path="search" element={<SearchResults />} />
                        <Route path="edit-food/:id" element={<AddFood />} />
                        <Route
                            path="edit-category/:id"
                            element={<AddCategory />}
                        />
                        <Route path="edit-user/:id" element={<AddUser />} />
                        {/*  */}
                        <Route
                            path="createregisterorder"
                            element={<CreateRegisterOrder />}
                        />
                    </Route>

                    {/* ========== User Dashboard Routes ========== */}
                    <Route
                        path={`${App_User}`}
                        element={
                            <ProtectedRoute>
                                <AppUserLayout />
                            </ProtectedRoute>
                        }
                    >
                        {/* User Dashboard Routes */}
                        <Route
                            index
                            element={
                                <Navigate replace to={`${App_User}/profile`} />
                            }
                        />
                        <Route path="profile" element={<AppUser />} />
                        <Route
                            path="updateprofile/:id"
                            element={<UpdateProfile />}
                        />
                        <Route
                            path="createregisterorder"
                            element={<CreateRegisterOrder />}
                        />
                        <Route path="listorders" element={<ListOrders />} />
                        <Route
                            path="detailsorder/:slug"
                            element={<ProductDetail />}
                        />
                        <Route
                            path={`/${App_User}/detailsorder/:slug"`}
                            element={<ProductDetail />}
                        />
                        {/*  */}
                        <Route
                            path={`/${App_User}/cart/:slug`}
                            element={<Cartpage />}
                        />
                    </Route>

                    {/* ========== Main Public Routes ========== */}
                    <Route path="/" element={<HomepageLayout />}>
                        <Route index element={<Homepage />} />
                        <Route path="vendors" element={<Vendorspage />} />
                        <Route path="cart" element={<Cartpage />} />
                        <Route path="aboutus" element={<About_us />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="order" element={<Order />} />
                        <Route path="detail/:id" element={<ProductDetail />} />

                        {/* Authentication Pages */}
                        <Route path="login" element={<Loginpage />} />
                        <Route path="register" element={<Register />} />
                        <Route
                            path="forgot-password"
                            element={<ForgotPassword />}
                        />
                        <Route
                            path="reset-password/:token"
                            element={<ResetPassword />}
                        />
                        <Route path="confirmemail" element={<ConfirmEmail />} />
                        <Route
                            path="changepassword"
                            element={<ChangePassword />}
                        />
                        <Route path="logout" element={<Logout />} />
                        <Route path="success" element={<SuccessPage />} />
                        <Route path="cancel" element={<CancelPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

// import { lazy, Suspense } from "react";
// import {
//     BrowserRouter,
//     Routes,
//     Route,
//     useParams,
//     Navigate,
//     Router,
// } from "react-router-dom";
//
// import Nav from "../component/navbar/nav";
// import Home_p from "../pages/home";
// import Footer from "../component/footer/footer";
// import Loader from "../ui/loader/Loader";
// import { App_Admin, App_Company, App_User } from "../utils/constants";
// import AppUserLayout from "../pages/user/AppUserLayout";
// import ProtectedRoute from "../ui/auth/ProtectedRoute";
// import AppUser from "../pages/user/AppUser";
// import UpdateProfile from "../pages/user/updateprofile/UpdateProfile";
// import CreateRegisterOrder from "../components/registerorder/createregisterorder/CreateRegisterOrder";
// import ListOrders from "../components/registerorder/listorders/ListOrders";
// import DetailsOrder from "../components/registerorder/detailsorder/DetailsOrder";
// import HomepageLayout from "../components/layouts/Homepagelayout";
// import ConfirmEmail from "../ui/confirmemail/ConfirmEmail";
// import ChangePassword from "../ui/changepassword/ChangePassword";
// import Logout from "../ui/logout/Logout";
// import ProtectedRouteCompany from "../ui/auth/ProtectedRouteCompany";
// import AppAdminLayout from "../pages/admin/AppAdminLayout";
// import AppAdmin from "../pages/admin/AppAdmin";
// import CategoryList from "../component/admin/CategoryList";
// import FoodList from "../component/admin/FoodList";
// import AddFood from "../component/admin/Forms/AddFood";
// import UserList from "../component/admin/UserList";
// import AddCategory from "../component/admin/Forms/AddCategory";
// import AddUser from "../component/admin/Forms/AddUser";
// import SearchResults from "../component/admin/SearchResults";
//
// // const Homepage = lazy(() => import("../pages/home/homepage"));
// // const Loginpage = lazy(() => import("./../pages/loginpage"));
// // const Productpage = lazy(() => import("../pages/products/productpage"));
// // const Register = lazy(() => import("../pages/registerpage"));
// // const Cartpage = lazy(() => import("./../pages/cartpage"));
// // const P_detail = lazy(() => import("./../pages/products/p_detail"));
//
// const Homepage = lazy(() => import("../pages/home"));
// const Loginpage = lazy(() => import("../pages/login"));
// const Vendorspage = lazy(() => import("../pages/vedore"));
// const Register = lazy(() => import("../pages/signup"));
// const Cartpage = lazy(() => import("../pages/cart"));
// const About_us = lazy(() => import("../pages/about_us"));
// const ProductDetail = lazy(() => import("../pages/product_detail_page"));
// const Profile = lazy(() => import("../pages/profile/profile"));
// const ForgotPassword = lazy(() =>
//     import("../pages/forgotpassword/forgotpassword")
// );
// const ResetPassword = lazy(() =>
//     import("../pages/resetpassword/resetpassword")
// );
// const Order = lazy(() => import("../pages/order/order_paga"));
//
// // const {id}=useParams();
//
// export default function AppRoute() {
//     return (
//         <>
//             <Suspense fallback={<Loader />}>
//                 <BrowserRouter>
//                     <Routes>
//                         {/* company */}
//                         <Route
//                             path={`${App_Admin}`}
//                             element={
//                                 <ProtectedRouteCompany>
//                                     <AppAdminLayout />
//                                 </ProtectedRouteCompany>
//                             }
//                         >
//                             <Route
//                                 index
//                                 element={
//                                     <Navigate
//                                         replace
//                                         to={`${App_Admin}/profile`}
//                                     />
//                                 }
//                             />
//                             <Route
//                                 exact
//                                 path={`${App_Admin}`}
//                                 component={Router}
//                             />
//                             <Route
//                                 path={`/${App_Admin}`}
//                                 element={<AppAdmin />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/profile`}
//                                 element={<AppAdmin />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/${App_Admin}/profile`}
//                                 element={<AppAdmin />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}profile`}
//                                 element={<AppAdmin />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}-profile`}
//                                 element={<AppAdmin />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/${App_Admin}profile`}
//                                 element={<AppAdmin />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/${App_Admin}-profile`}
//                                 element={<AppAdmin />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/profile${App_Admin}`}
//                                 element={<AppAdmin />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/profile-${App_Admin}`}
//                                 element={<AppAdmin />}
//                             />
//
//                             {/* ==========================admin======================= */}
//                             {/* ==========================admin======================= */}
//
//                             {/*
//                             <Route
//                                 path={`/${App_Admin}/category-list`}
//                                 element={<CategoryList />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/food-list`}
//                                 element={<FoodList />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/add-food`}
//                                 element={<AddFood />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/users-list`}
//                                 element={<UserList />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/add-category`}
//                                 element={<AddCategory />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/add-user`}
//                                 element={<AddUser />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/search`}
//                                 element={<SearchResults />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/edit-food/:id`}
//                                 element={<AddFood />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/edit-category/:id`}
//                                 element={<AddCategory />}
//                             />
//                             <Route
//                                 path={`/${App_Admin}/edit-user/:id`}
//                                 element={<AddUser />}
//                             />
//  */}
//                             {/*  */}
//                         </Route>
//
//                         {/* user */}
//                         <Route
//                             path={`/${App_User}`}
//                             element={
//                                 <ProtectedRoute>
//                                     <AppUserLayout />
//                                 </ProtectedRoute>
//                             }
//                         >
//                             <Route
//                                 index
//                                 element={
//                                     <Navigate
//                                         replace
//                                         to={`${App_User}/profile`}
//                                     />
//                                 }
//                             />
//
//                             <Route
//                                 exact
//                                 path={`/${App_User}`}
//                                 component={Router}
//                             />
//                             <Route path={`${App_User}`} element={<AppUser />} />
//                             <Route
//                                 path={`/${App_User}/profile`}
//                                 element={<AppUser />}
//                             />
//                             <Route
//                                 path={`/${App_User}/${App_User}/profile`}
//                                 element={<AppUser />}
//                             />
//                             <Route
//                                 path={`/${App_User}profile`}
//                                 element={<AppUser />}
//                             />
//                             <Route
//                                 path={`/${App_User}-profile`}
//                                 element={<AppUser />}
//                             />
//                             <Route
//                                 path={`/${App_User}/${App_User}profile`}
//                                 element={<AppUser />}
//                             />
//
//                             {/* update profile */}
//                             <Route
//                                 path={`/${App_User}/updateprofile/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/update/profile/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/update-profile/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/profile/update/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/profile-update/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/editprofile/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/edit-profile/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/edit/profile/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/profileedit/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/profile-edit/:id`}
//                                 element={<UpdateProfile />}
//                             />
//                             <Route
//                                 path={`/${App_User}/profile/edit/:id`}
//                                 element={<UpdateProfile />}
//                             />
//
//                             {/* register order */}
//                             {/* create order */}
//                             <Route
//                                 path={`/${App_User}/createregisterorder`}
//                                 element={<CreateRegisterOrder />}
//                             />
//                             <Route
//                                 path={`/${App_User}/create/registerorder`}
//                                 element={<CreateRegisterOrder />}
//                             />
//                             <Route
//                                 path={`/${App_User}/createregister/order`}
//                                 element={<CreateRegisterOrder />}
//                             />
//                             <Route
//                                 path={`/${App_User}/create/register/order`}
//                                 element={<CreateRegisterOrder />}
//                             />
//                             <Route
//                                 path={`/${App_User}/create-registerorder`}
//                                 element={<CreateRegisterOrder />}
//                             />
//                             <Route
//                                 path={`/${App_User}/createregister-order`}
//                                 element={<CreateRegisterOrder />}
//                             />
//                             <Route
//                                 path={`/${App_User}/create-register-order`}
//                                 element={<CreateRegisterOrder />}
//                             />
//                             <Route
//                                 path={`/${App_User}/create/register-order`}
//                                 element={<CreateRegisterOrder />}
//                             />
//                             <Route
//                                 path={`/${App_User}/create-register/order`}
//                                 element={<CreateRegisterOrder />}
//                             />
//
//                             {/* list order */}
//                             <Route
//                                 path={`/${App_User}/listorders`}
//                                 element={<ListOrders />}
//                             />
//
//                             {/* details order */}
//                             {/* <Route
//                                 path={`/${App_User}/detailsorder/:slug/`}
//                                 element={<DetailsOrder />}
//                             /> */}
//                             <Route
//                                 path={`/${App_User}/detailsorder/:slug/`}
//                                 element={<ProductDetail />}
//                             />
//                         </Route>
//
//                         {/* web site */}
//                         {/* <Nav /> */}
//                         <Route path="/" element={<HomepageLayout />}>
//                             <Route path="/" element={<Homepage />} />
//                             <Route path="/vendors" element={<Vendorspage />} />
//                             <Route path="/cart" element={<Cartpage />} />
//                             <Route path="/aboutus" element={<About_us />} />
//                             {/* -----------------------------------------
//                             -------------------------------------------
//                             ---------------------------------------- */}
//                             {/* <Route path="/detailsproject/:slug/" element={<ProductDetail />}/> */}
//                             <Route path="/detail/:id" element={<ProductDetail />} />
//                             {/* -------------------------------------------
//                             --------------------------------------------
//                             --------------------------- */}
//
//                             <Route path="/profile" element={<Profile />} />
//                             <Route path="/order" element={<Order />} />
//
//                             {/* Verify user */}
//                             <Route path="/login" element={<Loginpage />} />
//                             <Route path="/register" element={<Register />} />
//                             <Route
//                                 path="/forgot-password"
//                                 element={<ForgotPassword />}
//                             />
//                             <Route
//                                 path="/reset-password/:token"
//                                 element={<ResetPassword />}
//                             />
//                             <Route
//                                 path="/confirmemail"
//                                 element={<ConfirmEmail />}
//                             />
//                             <Route
//                                 path="/resetpassword"
//                                 element={<ResetPassword />}
//                             />
//                             <Route
//                                 path="/changepassword"
//                                 element={<ChangePassword />}
//                             />
//                             <Route path="/logout" element={<Logout />} />
//                         </Route>
//                     </Routes>
//                 </BrowserRouter>
//             </Suspense>
//         </>
//     );
// }
