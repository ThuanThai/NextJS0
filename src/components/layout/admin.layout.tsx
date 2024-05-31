import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import { useEffect } from "react";

const LayoutAdmin = () => {
    const getToken = async () => {
        const res = await fetch("http://localhost:8000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: "admin@gmail.com",
                password: "123456",
            }),
        });

        const data = await res.json();
        const { access_token } = data.data;
        localStorage.setItem("access_token", access_token);
    };
    useEffect(() => {
        getToken();
    }, []);
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default LayoutAdmin;
