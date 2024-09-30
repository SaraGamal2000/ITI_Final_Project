import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Nav from "../component/navbar/nav";
import Home_p from "../pages/home";

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


export default function AppRoute() {
  return (
    <>
      <Suspense>
        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<Loginpage />}></Route>
            <Route path="/vendors" element={<Vendorspage />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/cart" element={<Cartpage />}></Route>
            <Route path="/aboutus" element={<About_us />}></Route>
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  );
}