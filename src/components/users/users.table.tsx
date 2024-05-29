import { Table, notification } from "antd";
import type { TableProps, PopconfirmProps } from "antd";
import { Button, message, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import CreateModal from "./create.user.modal";
import UpdateModal from "./update.user.modal";

export interface IUserForm {
    _id?: string;
    name: string;
    email: string;
    password: string;
    age: string;
    gender: string;
    address: string;
    role: string;
}

const UsersTable = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState<IUserForm | null>(null);
    const [dataSource, setDataSource] = useState<IUserForm[]>([]);
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjYzOWZjMjgzZDkxMDU4YjhiZGRjNTM0IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTY4ODQ3OTAsImV4cCI6MTgwMzI4NDc5MH0.HBX4UqaZ3LSUAgndyl-Uojgp5Njn8_NEYtjaLO6Z4iU";

    const getData = async () => {
        const res = await fetch("http://localhost:8000/api/v1/users/all", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();
        const users = data.data.result;
        setDataSource(users);
    };

    useEffect(() => {
        getData();
    }, []);

    const cancel: PopconfirmProps["onCancel"] = (e) => {
        console.log(e);
        message.error("Click on No");
    };

    const confirm = async (user: IUserForm) => {
        console.log(user);
        const res = await fetch(
            `http://localhost:8000/api/v1/users/${user._id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const d = await res.json();
        if (d.data) {
            notification.success({
                message: "Successfully Delete User",
                description:
                    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            });
            await getData();
        } else {
            notification.error({
                message: "Error",
                description: JSON.stringify(d.message),
            });
        }
    };

    const columns: TableProps<IUserForm>["columns"] = [
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => {
                return (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            columnGap: "15px",
                        }}>
                        <EditOutlined
                            onClick={() => {
                                setIsUpdateModalOpen(true);
                                setDataUpdate(record);
                            }}
                        />
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => confirm(record)}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No">
                            <DeleteOutlined />
                        </Popconfirm>
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}>
                <h2>Table Users</h2>
                <Button
                    onClick={() => setIsCreateModalOpen(true)}
                    icon={<PlusOutlined />}
                    type="primary">
                    Add User
                </Button>
                <CreateModal
                    isCreateModalOpen={isCreateModalOpen}
                    setIsCreateModalOpen={setIsCreateModalOpen}
                    token={token}></CreateModal>
                <UpdateModal
                    getData={getData}
                    data={dataUpdate}
                    isUpdateModalOpen={isUpdateModalOpen}
                    setIsUpdateModalOpen={setIsUpdateModalOpen}
                    token={token}></UpdateModal>
            </div>
            <Table rowKey="_id" dataSource={dataSource} columns={columns} />;
        </div>
    );
};
export default UsersTable;
