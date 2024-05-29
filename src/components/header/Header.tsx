import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
    {
        label: <Link to={"/"}>HomePage</Link>,
        key: "mail",
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/users"}>Users</Link>,
        key: "users",
        icon: <UserOutlined />,
    },
];

const Header = () => {
    const [current, setCurrent] = useState("mail");

    const onClick: MenuProps["onClick"] = (e) => {
        console.log("click ", e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};

export default Header;
