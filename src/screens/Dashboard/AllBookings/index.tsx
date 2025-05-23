import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { apiURL } from '../../../../helper';
import { useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNotify } from '../../../utils/NotificationProvider';
import api from '../../../../axiosInterceptor';

const AllBookings = () => {

    const user = useSelector((state) => state?.user?.user)
    const notify = useNotify()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const columns = [
        {
            title: 'User',
            dataIndex: 'userName',
            key: 'userName',
            render: (_, record) => (
                <p>{record?.userDetails?.name} ({record?.userDetails?.email})</p>
            )
        },
        {
            title: 'User Contact',
            dataIndex: 'userContact',
            key: 'userContact',
            render: (_, record) => (
                <p>{record?.userDetails?.phoneNumber}</p>
            )
        },
        {
            title: 'Event Type',
            dataIndex: 'eventType',
            key: 'eventType',
            render: (_, record) => (
                <p>{record?.EventDetails?.eventType}</p>
            )
        },
        {
            title: 'Event Date',
            dataIndex: 'eventDate',
            key: 'eventDate',
            render: (_, record) => (
                <p>{record?.EventDetails?.eventDate} </p>
            )
        },
        {
            title: 'Guest Count',
            dataIndex: 'guestCount',
            key: 'guestCount',
            render: (_, record) => (
                <p>{record?.EventDetails?.guestCount}</p>
            )
        },
        {
            title: 'Vendor',
            dataIndex: 'vendorName',
            key: 'vendorName',
            render: (_, record) => (
                <p>{record?.vendorDetails?.name} ({record?.vendorDetails?.email})</p>
            )
        },
        {
            title: 'Vendor Contact',
            dataIndex: 'vendorContact',
            key: 'vendorContact',
            render: (_, record) => (
                <p>{record?.vendorDetails?.phoneNumber}</p>
            )
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (_, record) => (
                !record?.isApproved && !record?.isRejected ?
                    <Tag color='purple' className='hover:cursor-pointer'>Pending</Tag>
                    :
                    record?.isApproved ?
                        <Tag color='green' className='hover:cursor-pointer'>Accepted</Tag>
                        :
                        <Tag color='red' className='hover:cursor-pointer'>Rejected</Tag>
            )
        }
    ];

    function getAllBookings() {
        return api.get(`${apiURL}/bookings/get-all-bookings`)
            .then((res) => setData(res.data))
    }

    useEffect(() => {
        getAllBookings()
    }, [])


    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>All Bookings</p>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default AllBookings