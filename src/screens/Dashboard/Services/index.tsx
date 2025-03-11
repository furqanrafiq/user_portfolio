import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { apiURL } from '../../../../helper';
import { useSelector } from 'react-redux';
import AddServiceModal from './AddServiceModal';

const Services = () => {
    interface DataType {
        key: string;
        name: string;
        age: number;
        address: string;
        tags: string[];
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'serviceName',
            key: 'serviceName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tag color='blue' style={{ cursor: 'pointer' }}>Edit</Tag>
                    <Tag color='red' style={{ cursor: 'pointer' }}>Delete</Tag>
                </Space>
            ),
        },
    ];

    const userid = localStorage.getItem('easyShadiUserId')
    const [userServices, setUserServices] = useState()
    const [isModalOpen, setIsModalOpen] = useState(Boolean)

    function getUserServices(userId) {
        return axios.get(`${apiURL}/api/services/user-service?userId=${userId}`).then((res) => {
            setUserServices(res.data)
        })
    }

    useEffect(() => {
        getUserServices(userid)
    }, [])

    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>Services</p>
                <Button
                    type="primary"
                    className="border-none h-12 text-base font-small w-[200px]"
                    size="small"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Service
                </Button>
            </div>
            <Table<DataType> columns={columns} dataSource={userServices} />
            <AddServiceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    )
}

export default Services