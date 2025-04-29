import React, { useEffect, useState } from 'react'
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import noData from '../../../assets/no-data.png'
import GuestModal from './GuestModal';
import api from '../../../../axiosInterceptor';
import { useSelector } from 'react-redux';

const GuestList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user = useSelector((state) => state?.user?.user)
    const [userGuests, setUserGuests] = useState([])

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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <p>{`${record?.firstName} ${record?.lastName}`}</p>
            ),
        },
        {
            title: 'email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
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
    ]


    function getUserGuests() {
        return api.get(`/guests/get-user-guests?userId=${user?.uuid}`)
            .then((res) => setUserGuests(res.data))
    }

    useEffect(() => {
        getUserGuests()
    }, [])

    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>Guestlist</p>
                <Button
                    type="primary"
                    className="border-none h-12 text-base font-small w-[200px]"
                    size="small"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Guest
                </Button>
            </div>
            <Table columns={columns} dataSource={userGuests} locale={{ emptyText: <CustomNoData /> }} />
            <GuestModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getUserGuests={getUserGuests} />
        </div>
    )
}

export default GuestList