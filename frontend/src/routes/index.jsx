import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import React from 'react';
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import ForgetPassword from "../pages/ForgetPassword.jsx";
import Signup from "../pages/Signup.jsx";
import AdminPanel from "../pages/AdminPanel.jsx";
import AllUsers from "../pages/AllUsers.jsx";
import AllProducts from "../pages/AllProducts.jsx";
import CategoryProduct from "../pages/CategoryProduct.jsx";
import ProductDetails from "../pages/ProductDetails.jsx";
import Cart from "../pages/Cart.jsx";
import SearchProduct from "../pages/SearchProduct.jsx";
import Success from "../pages/Success.jsx";
import Cancel from "../pages/Cancel.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Home/>
            },
            {
                path: "login",
                element: <Login/>
            },
            {
                path: "forget-password",
                element: <ForgetPassword/>
            },
            {
                path: "sign-up",
                element: <Signup/>
            },
            {
                path:"product-category",
                element: <CategoryProduct/>
            },
            {
                path:"product/:id",
                element:<ProductDetails/>
            },
            {
                path:"cart",
                element:<Cart/>
            },
            {
                path:"success",
                element:<Success/>
            },
            {
                path:"cancel",
                element:<Cancel/>
            },
            {
                path : "search",
                element:<SearchProduct/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel/>,
                children:[
                    {
                        path:"all-users",
                        element:<AllUsers/>
                    },
                    {
                        path:"all-products",
                        element:<AllProducts/>
                    }
                ]
            }
        ]
    }
]);

export default router;
