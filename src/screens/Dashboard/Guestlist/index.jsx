import React, { useState } from 'react'
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import noData from '../../../assets/no-data.png'
import GuestModal from './GuestModal';

const GuestList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)


    const CustomNoData = () => (
        <div className='p-5'>
            <p className='text-[18px] font-sans mb-2' style={{ color: 'gray' }}>You haven't added any guests</p>
            <Button type="primary" icon={<PlusOutlined />} className='mt-3' onClick={() => setIsModalOpen(true)}>
                Add Guest
            </Button>
        </div>
    );

    const columns = [
        {
            title: 'S. No.',
            dataIndex: 'index',
            key: 'index',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
            <GuestModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    )
}

export default GuestList