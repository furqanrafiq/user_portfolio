import React, { useEffect, useState } from 'react'
import { Button, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import axios from 'axios';
import { apiURL } from '../../../../helper';
import { useSelector } from 'react-redux';
import AddServiceModal from './AddServiceModal';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNotify } from '../../../utils/NotificationProvider';

const Services = () => {

    const user = useSelector((state) => state?.user?.user)
    const [userServices, setUserServices] = useState()
    const [isModalOpen, setIsModalOpen] = useState(Boolean)
    const [editService, setEditService] = useState({})
    const notify = useNotify()

    function getUserServices(userId) {
        return axios.get(`${apiURL}/services/user-service?userId=${user?.uuid}`).then((res) => {
            setUserServices(res.data)
        })
    }

    useEffect(() => {
        getUserServices(user?.uuid)
    }, [user])

    function deleteUserService(uuid) {
        return axios.get(`${apiURL}/services/delete-user-service?uuid=${uuid}`)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                getUserServices(user?.id)
            }).catch((err) => {
                notify.error({
                    message: 'Error!',
                    description: err.data.msg,
                    placement: 'topRight',
                });
            })
    }

    interface DataType {
        key: string;
        name: string;
        serviceId: string;
        description: string;
        price: number;
        uuid: string;
    }

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Service',
            dataIndex: 'serviceName',
            key: 'serviceName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
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
                    <EditOutlined style={{ cursor: 'pointer' }} onClick={(() => { setEditService(record); setIsModalOpen(true) })} />
                    <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => deleteUserService(record.uuid)} />
                </Space>
            ),
        },
    ];


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
            <AddServiceModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getUserServices={getUserServices} editService={editService} setEditService={setEditService} />
        </div>
    )
}

export default Services