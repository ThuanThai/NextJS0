import React, { useEffect } from "react";
import UsersTable from "../components/users/users.table";

const UsersPage = () => {
    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjYzOWZjMjgzZDkxMDU4YjhiZGRjNTM0IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3MTU5MTA3MzksImV4cCI6MTgwMjMxMDczOX0.VEeAs0G1vbxFxmGrMBRsY68L4VXSZPqgkoFgEIcxXnU";
    useEffect(() => {
        const getData = async () => {
            const res = await fetch("http://localhost:8000/api/v1/users/all", {
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            console.log(data);
        };

        getData();
    }, []);
    return (
        <div>
            <UsersTable></UsersTable>
        </div>
    );
};

export default UsersPage;
