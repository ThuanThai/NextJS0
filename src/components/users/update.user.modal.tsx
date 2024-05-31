import { Form, FormProps, Input, Modal, Select, notification } from "antd";
import { useEffect } from "react";
import { IUserForm } from "./users.table";

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (val: boolean) => void;
    token: string | null;
    data: IUserForm | null;
    getData: () => Promise<void>;
}

const UpdateModal = (props: IProps) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, token, data } = props;
    const [form] = Form.useForm<IUserForm>();

    useEffect(() => {
        if (data) {
            form.setFieldsValue({ ...data });
        }
    }, [data, form]);

    const handleCancel = () => {
        setIsUpdateModalOpen(false);
    };

    const onFinish: FormProps<IUserForm>["onFinish"] = async (values) => {
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ ...values }),
        });
        const d = await res.json();
        if (d.data) {
            notification.success({
                message: "Successfully Create new user",
                description:
                    "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
            });
            setIsUpdateModalOpen(false);
            await props.getData();
        } else {
            notification.error({
                message: "Error",
                description: JSON.stringify(d.message),
            });
        }

        console.log(d);
    };

    const onFinishFailed: FormProps["onFinishFailed"] = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Modal
            title="Add New User"
            open={isUpdateModalOpen}
            onOk={form.submit}
            onCancel={handleCancel}>
            <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">
                <Form.Item<IUserForm>
                    style={{ marginBottom: 10, display: "none" }}
                    label="Id"
                    name="_id"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Id!",
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item<IUserForm>
                    style={{ marginBottom: 10 }}
                    label="Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Name!",
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item<IUserForm>
                    style={{ marginBottom: 10 }}
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Email!",
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item<IUserForm>
                    style={{ marginBottom: 10 }}
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: data ? false : true,
                            message: "Please input your Password!",
                        },
                    ]}>
                    <Input.Password disabled={!!data} />
                </Form.Item>

                <Form.Item<IUserForm>
                    style={{ marginBottom: 10 }}
                    label="Age"
                    name="age"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Age!",
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item<IUserForm>
                    style={{ marginBottom: 10 }}
                    label="Address"
                    name="address"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Address!",
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item<IUserForm>
                    style={{ marginBottom: 10 }}
                    label="Gender"
                    name="gender"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Gender!",
                        },
                    ]}>
                    <Select>
                        <Select.Option value="MALE">Male</Select.Option>
                        <Select.Option value="FEMALE">Female</Select.Option>
                        <Select.Option value="OTHER">Other</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item<IUserForm>
                    style={{ marginBottom: 10 }}
                    label="Role"
                    name="role"
                    rules={[
                        {
                            required: true,
                            message: "Please input your Role!",
                        },
                    ]}>
                    <Select>
                        <Select.Option value="ADMIN">Admin</Select.Option>
                        <Select.Option value="USER">User</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateModal;
