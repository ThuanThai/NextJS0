import {
    Popconfirm,
    PopconfirmProps,
    Table,
    TableProps,
    message,
    notification,
} from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined } from '@ant-design/icons';

interface ITrack {
    _id: string;
    title: string;
    description: string;
    category: string;
    imgUrl: string;
    trackUrl: string;
    countLike: number;
    countPlay: number;
}

const TrackTable = () => {
    const [dataSource, setDataSource] = useState<ITrack[]>([]);
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0,
    });

    const token = localStorage.getItem('access_token') as string;

    const getData = async () => {
        const res = await fetch(
            `http://localhost:8000/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`,
            {
                headers: {
                    'Content-Type': 'application/json',
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

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    const confirm = async (track: ITrack) => {
        console.log(track);
        const res = await fetch(
            `http://localhost:8000/api/v1/tracks/${track._id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const d = await res.json();
        if (d.data) {
            notification.success({
                message: 'Successfully Delete a track',
                description:
                    'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
            });
            await getData();
        } else {
            notification.error({
                message: 'Error',
                description: JSON.stringify(d.message),
            });
        }
    };

    useEffect(() => {
        getData();
    }, [meta.pageSize, meta.current]);

    const columns: TableProps<ITrack>['columns'] = [
        {
            title: 'Number',
            dataIndex: '_id',
            render: (value, record, index) => {
                return <>{(meta.current - 1) * meta.pageSize + index + 1}</>;
            },
        },
        {
            title: 'Title',
            dataIndex: 'title',
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },
        {
            title: 'Tracl URL',
            dataIndex: 'traclUrl',
        },
        {
            title: 'Track URL',
            dataIndex: 'trackUrl',
        },
        {
            title: 'Uploader',
            dataIndex: ['uploader', 'name'],
        },

        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => {
                return (
                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
                        onConfirm={() => confirm(record)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <DeleteOutlined />
                    </Popconfirm>
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
    return (
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
    );
};

export default TrackTable;
