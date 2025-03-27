import React from 'react'
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import noData from '../../../assets/no-data.png'

const Checklist = () => {

    const CustomNoData = () => (
        <div className='p-5'>
            <p className='text-[18px] font-sans mb-2' style={{color:'gray'}}>You don’t have Upcoming tasks</p>
            <p className='text-[14x] font-sans' style={{color:'gray'}}>You can add tasks here:</p>
            <Button type="primary" icon={<PlusOutlined />} className='mt-3'>
                Add Task
            </Button>
        </div>
    );

    const columns = [
        {
            title: 'Task',
            dataIndex: 'taskTitle',
            key: 'taskTitle',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Assignee',
            dataIndex: 'assignee',
            key: 'assignee',
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ cursor: 'pointer' }} />
                    <DeleteOutlined style={{ cursor: 'pointer' }} />
                </Space>
            ),
        },
    ];

    const data = []

    return (
        <div>
            <Table columns={columns} dataSource={data} locale={{ emptyText: <CustomNoData /> }} />
        </div>
    )
}

export default Checklist