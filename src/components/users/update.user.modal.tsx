import { Input, Modal, notification } from "antd";
import { ChangeEvent, useEffect, useState } from "react";
import { IUserForm } from "./users.table";

interface IProps {
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (val: boolean) => void;
    token: string;
    data: IUserForm | null;
    getData: () => Promise<void>;
}

const UpdateModal = (props: IProps) => {
    const { isUpdateModalOpen, setIsUpdateModalOpen, token, data } = props;
    const [formValue, setFormValue] = useState<IUserForm>({
        email: "",
        name: "",
        password: "",
        age: "",
        role: "",
        gender: "",
        address: "",
    });

    useEffect(() => {
        if (data) {
            setFormValue({ ...data });
        }
    }, [data]);

    const onChangeFormValue = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValue((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleOk = async () => {
        const res = await fetch("http://localhost:8000/api/v1/users", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formValue),
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

    const handleCancel = () => {
        setIsUpdateModalOpen(false);
    };

    return (
        <Modal
            title="Add New User"
            open={isUpdateModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}>
            <div>
                <label htmlFor="name">Name: </label>
                <Input
                    value={formValue.name}
                    onChange={onChangeFormValue}
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                />
            </div>
            <div>
                <label htmlFor="email">Email: </label>
                <Input
                    value={formValue.email}
                    onChange={onChangeFormValue}
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <Input
                    value={formValue.password}
                    onChange={onChangeFormValue}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                />
            </div>

            <div>
                <label htmlFor="age">Age: </label>
                <Input
                    value={formValue.age}
                    onChange={onChangeFormValue}
                    name="age"
                    id="age"
                    placeholder="Enter your age"
                />
            </div>
            <div>
                <label htmlFor="gender">Gender: </label>
                <Input
                    value={formValue.gender}
                    onChange={onChangeFormValue}
                    name="gender"
                    id="gender"
                    placeholder="Enter your gender"
                />
            </div>
            <div>
                <label htmlFor="address">Address: </label>
                <Input
                    value={formValue.address}
                    onChange={onChangeFormValue}
                    name="address"
                    id="address"
                    placeholder="Enter your address"
                />
            </div>
            <div>
                <label htmlFor="role">Role: </label>
                <Input
                    value={formValue.role}
                    onChange={onChangeFormValue}
                    name="role"
                    id="role"
                    placeholder="Enter your role"
                />
            </div>
        </Modal>
    );
};

export default UpdateModal;
