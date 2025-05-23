import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { apiURL } from '../../../../helper';
import { useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNotify } from '../../../utils/NotificationProvider';
import api from '../../../../axiosInterceptor';
import InvoiceModal from './InvoiceModal';

const Invoices = () => {

    const user = useSelector((state) => state?.user?.user)
    const notify = useNotify()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})

    const columns = [
        {
            title: 'Vendor',
            dataIndex: 'vendorName',
            key: 'vendorName',
            render: (_, record) => (
                <p>{record?.VendorDetails?.name} ({record?.VendorDetails?.email})</p>
            )
        },
        {
            title: 'Vendor Contact',
            dataIndex: 'vendorContact',
            key: 'vendorContact',
            render: (_, record) => (
                <p>{record?.VendorDetails?.phoneNumber}</p>
            )
        },
        {
            title: 'Service(s)',
            dataIndex: 'services',
            key: 'services',
            render: (_, record) => {
                return (
                    <>
                        {record?.services?.map(item => {
                            return (
                                <Tag>{item?.serviceName}</Tag>
                            )
                        })}
                    </>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Tag color='blue' className='cursor-pointer' onClick={() => { setIsModalOpen(true); setSelectedItem(record) }}>
                    View Invoice
                </Tag>
            )
        },
    ];

    function getInvoices() {
        return api.get(`${apiURL}/bookings/get-user-invoices?userId=${user?.uuid}`)
            .then((res) => setData(res.data))
    }

    useEffect(() => {
        getInvoices()
    }, [])


    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>Invoices</p>
            </div>
            <Table columns={columns} dataSource={data} />
            <InvoiceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedItem={selectedItem}/>
        </div>
    )
}

export default Invoices