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
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });

    const token = localStorage.getItem("access_token");
    const getData = async () => {
        const res = await fetch(
            `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();
        const users = data.data.result;
        const pageInfo = data.data.meta;
        setMeta((prev) => ({
            ...prev,
            total: pageInfo.total,
            pages: pageInfo.pages,
        }));
        setDataSource(users);
    };

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

    const handleChangePage = (page: number, pageSize: number) => {
        setMeta({
            ...meta,
            current: page,
            pageSize: pageSize,
        });
    };

    useEffect(() => {
        getData();
    }, [meta.pageSize, meta.current]);

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
            <Table
                rowKey="_id"
                dataSource={dataSource}
                columns={columns}
                pagination={{
                    current: meta.current,
                    defaultCurrent: 1,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    onChange: (page: number, pageSize: number) =>
                        handleChangePage(page, pageSize),
                    showSizeChanger: true,
                }}
            />
            ;
        </div>
    );
};
export default UsersTable;
