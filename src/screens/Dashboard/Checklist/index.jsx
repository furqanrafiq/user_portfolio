import React, { useEffect, useState } from 'react'
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import noData from '../../../assets/no-data.png'
import CheckListModal from './CheckListModal';
import api from '../../../../axiosInterceptor';
import { useSelector } from 'react-redux';

const Checklist = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user = useSelector((state) => state?.user?.user)
    const [userChecklist, setUserChecklist] = useState([])

    const CustomNoData = () => (
        <div className='p-5'>
            <p className='text-[18px] font-sans mb-2' style={{ color: 'gray' }}>You don’t have Upcoming tasks</p>
            <p className='text-[14x] font-sans' style={{ color: 'gray' }}>You can add tasks here</p>
            <Button type="primary" icon={<PlusOutlined />} className='mt-3' onClick={() => setIsModalOpen(true)}>
                Add Task
            </Button>
        </div>
    );

    const columns = [
        {
            title: 'Task',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
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

    function getUserChecklist() {
        return api.get(`/checklist/get-user-checklist?userId=${user?.uuid}`)
            .then((res) => setUserChecklist(res.data))
    }

    useEffect(() => {
        getUserChecklist()
    }, [])

    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>Checklist</p>
                <Button
                    type="primary"
                    className="border-none h-12 text-base font-small w-[200px]"
                    size="small"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Checklist
                </Button>
            </div>
            <Table columns={columns} dataSource={userChecklist} locale={{ emptyText: <CustomNoData /> }} />
            <CheckListModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getUserChecklist={getUserChecklist} />
        </div>
    )
}

export default Checklist