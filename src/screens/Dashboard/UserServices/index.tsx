import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { apiURL } from '../../../../helper';
import { useSelector } from 'react-redux';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNotify } from '../../../utils/NotificationProvider';
import api from '../../../../axiosInterceptor';

const UserServices = () => {

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
            title: 'Service Type',
            dataIndex: 'serviceName',
            key: 'serviceName'
        },
        {
            title: 'Service Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Service Price',
            dataIndex: 'price',
            key: 'price'
        },
    ];

    function getAllUserServices() {
        return api.get(`${apiURL}/services/get-all-user-services`)
            .then((res) => setData(res.data))
    }

    useEffect(() => {
        getAllUserServices()
    }, [])


    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>User Services</p>
            </div>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}

export default UserServices