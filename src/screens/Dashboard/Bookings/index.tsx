import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { apiURL } from '../../../../helper';
import { useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNotify } from '../../../utils/NotificationProvider';
import api from '../../../../axiosInterceptor';

const Bookings = () => {

    const user = useSelector((state) => state?.user?.user)
    const notify = useNotify()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    function acceptBooking(bookingId) {
        setLoading(true)
        const body = {
            bookingId
        }
        return api.post(`${apiURL}/bookings/accept-booking`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                getVendorBookings()
            })
            .catch((res) => {
                notify.error({
                    message: 'Error',
                    description: res.response.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
            })
    }


    function rejectBooking(bookingId) {
        setLoading(false)
        const body = {
            bookingId
        }
        return api.post(`${apiURL}/bookings/reject-booking`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                getVendorBookings()
            })
            .catch((res) => {
                notify.error({
                    message: 'Error',
                    description: res.response.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
            })
    }


    function receiveRequestFromVendor(bookingId) {
        setLoading(false)
        const body = {
            bookingId
        }
        return api.post(`${apiURL}/bookings/receive-payment-from-user`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                })
                setLoading(false)
                getVendorBookings()
            })
            .catch((err) => {
                notify.error({
                    message: 'Error!',
                    description: err.response.data.msg,
                    placement: 'topRight',
                })
                setLoading(false)
            })
    }


    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            render: (_, record) => (
                <p>{record?.userDetails?.name}</p>
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
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    {
                        !record?.isApproved && !record?.isRejected &&
                        <>
                            <Tag color='green' className='hover:cursor-pointer' onClick={() => acceptBooking(record.uuid)}>{loading ? 'Accepting...' : 'Accept'}</Tag>
                            <Tag color='red' className='hover:cursor-pointer' onClick={() => rejectBooking(record.uuid)}>{loading ? 'Rejecting...' : 'Reject'}</Tag>
                        </>
                    }

                    {
                        record?.isApproved && (
                            !record.isPaymentSent ?
                                <Tag color='red'
                                >
                                    Payment Not Received
                                </Tag>
                                :
                                record.isPaymentSent && !record.isPaymentReceived ?
                                    <Tag color='purple' className='hover:cursor-pointer'
                                        onClick={() => receiveRequestFromVendor(record.uuid)}
                                    >
                                        {loading ? 'Setting Payment as Received...' : 'Set Payment as Received'}</Tag>
                                    :
                                    <Tag color='green'>Payment Received</Tag>
                        )
                    }
                </Space>
            ),
        },
    ];

    function getVendorBookings() {
        return api.get(`${apiURL}/bookings/get-bookings?vendorId=${user?.uuid}`)
            .then((res) => setData(res.data))
    }

    useEffect(() => {
        getVendorBookings()
    }, [])


    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>Bookings</p>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default Bookings