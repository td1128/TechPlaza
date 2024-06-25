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
