import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import MyStore from "./Redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={MyStore}>
            <App />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

















//import React from "react";
//import ReactDOM from "react-dom/client";
//import "./index.css";
//import reportWebVitals from "./reportWebVitals";
//import "bootstrap/dist/css/bootstrap.min.css";
//import { Provider } from "react-redux";
//import MyStore from "./Redux/Store";
//import {
//  createBrowserRouter,
//  createRoutesFromElements,
//  Route,
//  RouterProvider,
//} from "react-router-dom";
//
//import App from "./App";
//import CategoryList from "./component/admin/CategoryList";
//import FoodList from "./component/admin/FoodList";
//import UsersList from "./component/admin/UserList";
//import LandingPage from "./component/admin/LandingPage";
//import SearchResults from "./component/admin/SearchResults";
//import AddFood from "./component/admin/Forms/AddFood";
//import AddCategory from "./component/admin/Forms/AddCategory";
//import AddUser from "./component/admin/Forms/AddUser";
//
//// Define the routes
//const router = createBrowserRouter(
//  createRoutesFromElements(
//    <Route path="/" element={<App />}>
//      <Route index element={<LandingPage />} />
//      <Route path="admin/category-list" element={<CategoryList />} />
//      <Route path="admin/food-list" element={<FoodList />} />
//      <Route path="/add-food" element={<AddFood />} />
//      <Route path="admin/users-list" element={<UsersList />} />
//      <Route path="/add-category" element={<AddCategory />} />
//      <Route path="/add-user" element={<AddUser />} />
//      <Route path="/search" element={<SearchResults />} />
//      <Route path="/edit-food/:id" element={<AddFood />} />
//      <Route path="/edit-category/:id" element={<AddCategory />} />
//      <Route path="/edit-user/:id" element={<AddUser />} />
//    </Route>
//  )
//);
//
//// Render the app
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(
//  <React.StrictMode>
//    <Provider store={MyStore}>
//      <RouterProvider router={router} /> {/* Use RouterProvider with the router object */}
//    </Provider>
//  </React.StrictMode>
//);
//
//// Measure performance if needed
//reportWebVitals();
//





//import React from "react";
//import ReactDOM from "react-dom/client";
//import "./index.css";
//import App from "./App";
//import reportWebVitals from "./reportWebVitals";
//import "bootstrap/dist/css/bootstrap.min.css";
//import { Provider } from "react-redux";
//import MyStore from "./Redux/Store";
//import 'bootstrap/dist/css/bootstrap.min.css';
//import CategoryList from './component/admin/CategoryList.js';
//import FoodList from './component/admin/FoodList.js';
//import UsersList from './component/admin/UserList.js';
//// @ts-ignore
//import LandingPage from "./component/admin/LandingPage.js";
//import SearchResults from './component/admin/SearchResults.js';
//import AddFood from './component/admin/Forms/AddFood.js';
//import AddCategory from './component/admin/Forms/AddCategory.js';
//import AddUser from './component/admin/Forms/AddUser.js';
//
//import {
//  createBrowserRouter,
//  createRoutesFromElements,
//  Route,
//  RouterProvider,
//} from "react-router-dom";
//
//// Define inline error element (404 and unexpected errors)
//const ErrorFallback = () => (
//  <div style={{ padding: "20px", textAlign: "center" }}>
//    <h1>Oops! Something went wrong.</h1>
//    <p>The page you're looking for doesn't exist or an error occurred.</p>
//  </div>
//);
//
//// Create the router with error handling and a 404 fallback route
//const router = createBrowserRouter(
//  createRoutesFromElements(
//    <Route path="admin/" element={<App />} errorElement={<ErrorFallback />}>
//      <Route index element={<LandingPage />} />
//      <Route path="admin/category-list" element={<CategoryList />} />
//      <Route path="admin/food-list" element={<FoodList />} />
//      <Route path="admin/add-food" element={<AddFood />} />
//      <Route path="admin/users-list" element={<UsersList />} />
//      <Route path="admin/add-category" element={<AddCategory />} />
//      <Route path="admin/add-user" element={<AddUser />} />
//      <Route path="admin/search" element={<SearchResults />} />
//      <Route path="admin/edit-food/:id" element={<AddFood />} />
//      <Route path="admin/edit-category/:id" element={<AddCategory />} />
//      <Route path="admin/edit-user/:id" element={<AddUser />} />
//
//      {/* Catch-all route for handling 404 Not Found */}
//      <Route path="*" element={<ErrorFallback />} />
//    </Route>
//  )
//);
//
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(
//  <React.StrictMode>
//    <Provider store={MyStore}>
//       <App/>
//      <RouterProvider router={router} />
//    </Provider>
//  </React.StrictMode>
//);
//
//// If you want to start measuring performance in your app, pass a function
//// to log results (for example: reportWebVitals(console.log))
//// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();






//import React from "react";
//import ReactDOM from "react-dom/client";
//import "./index.css";
//import App from "./App";
//import reportWebVitals from "./reportWebVitals";
//import "bootstrap/dist/css/bootstrap.min.css";
//import { Provider } from "react-redux";
//import MyStore from "./Redux/Store";
//import 'bootstrap/dist/css/bootstrap.min.css';
////import AppAdmin from "../pages/admin/AppAdmin";
//import CategoryList from "./component/admin/CategoryList";
//import FoodList from "./component/admin/FoodList";
//import AddFood from "./component/admin/Forms/AddFood";
//import UsersList from "./component/admin/UserList";
//import AddCategory from "./component/admin/Forms/AddCategory";
//import AddUser from "./component/admin/Forms/AddUser";
//import SearchResults from "./component/admin/SearchResults";
//import LandingPage from "./component/admin/LandingPage.js";
//import {
//    Route,
//    Routes,
//
//} from "react-router-dom";
//
//
//
//
//const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(
//    <React.StrictMode>
//        <Provider store={MyStore}>
//         <Router>
//           <Routes>
//
//             const router = createBrowserRouter(
//  createRoutesFromElements(
//       <App />
//    <Route path="/" element={<App />}>
//      <Route index element={<LandingPage />} />
//      <Route path="admin/category-list" element={<CategoryList />} />
//      <Route path="admin/food-list" element={<FoodList />} />
//      <Route path="/add-food" element={<AddFood />} />
//      <Route path="admin/users-list" element={<UsersList />} />
//      <Route path="/add-category" element={<AddCategory />} />
//      <Route path="/add-user" element={<AddUser />} />
//      <Route path="/search" element={<SearchResults />} />
//      <Route path="/edit-food/:id" element={<AddFood />} />
//      <Route path="/edit-category/:id" element={<AddCategory />} />
//      <Route path="/edit-user/:id" element={<AddUser />} />
//    </Route>
//  )
//);
//</Routes>
//  </Router>
//
//
//        </Provider>
//    </React.StrictMode>
//);
//
//// If you want to start measuring performance in your app, pass a function
//// to log results (for example: reportWebVitals(console.log))
//// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
