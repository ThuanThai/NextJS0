import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UsersPage from "./screens/users.page";
import Header from "./components/header/Header";
import "./App.css";

const LayoutAdmin = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutAdmin></LayoutAdmin>,
        children: [
            { index: true, element: <div>Hello From Homepage</div> },
            { path: "users", element: <UsersPage /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
