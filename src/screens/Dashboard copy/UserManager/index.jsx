import { Button, Col, Empty, Row, Segmented, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GeneralCard from '../../../components/auth/GeneralCard'
import api from '../../../../axiosInterceptor'
import { apiURL } from '../../../../helper'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useNotify } from '../../../utils/NotificationProvider'
import UserModal from './UserModal'

const UserManager = () => {
    const [allUsers, setAllUsers] = useState([])
    const user = useSelector((state) => state?.user?.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const notify = useNotify()

    function getUsers() {
        return api.get(`${apiURL}/user/get-all-users`).then((res) => {
            setAllUsers(res.data)
        })
    }

    function activateDeactivateUser(isActive, uuid) {
        const body = {
            isActive,
            uuid
        }
        return api.post(`${apiURL}/user/activate-deactivate-user`, body).then((res) => {
            notify.success({
                message: 'Success!',
                description: res.data.msg,
                placement: 'topRight',
            });
            getUsers()
        })
    }

    useEffect(() => {
        getUsers()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
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
                    <>
                        {
                            record?.isActive ?
                                <Tag color='red' className='hover:cursor-pointer'
                                    onClick={() => activateDeactivateUser(false, record.uuid)}
                                >Deactivate</Tag>
                                :
                                <Tag color='green' className='hover:cursor-pointer'
                                    onClick={() => activateDeactivateUser(true, record.uuid)}
                                >Activate</Tag>
                        }
                    </>
                    <EditOutlined style={{ cursor: 'pointer' }}
                        onClick={() => { setIsModalOpen(true); setSelectedItem(record) }}
                    />
                    {/* <DeleteOutlined style={{ cursor: 'pointer' }}
                        onClick={() => deleteUserGuest(record.uuid)}
                    /> */}
                </Space>
            ),
        },
        // {
        //     title: 'Action',
        //     key: 'action',
        //     render: (_, record) => (
        //         <Space size="middle">

        //         </Space>
        //     ),
        // },
    ]


    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>Users</p>
                <Button
                    type="primary"
                    className="border-none h-12 text-base font-small w-[200px]"
                    size="small"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add User
                </Button>
            </div>
            <Table columns={columns} dataSource={allUsers} className='mt-3' />
            <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getAllVendors={getUsers} selectedItem={selectedItem} />
        </div>
    )
}

export default UserManager