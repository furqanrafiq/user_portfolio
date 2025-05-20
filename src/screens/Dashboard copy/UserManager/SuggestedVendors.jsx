import { Button, Col, Empty, Row, Segmented, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GeneralCard from '../../../components/auth/GeneralCard'
import api from '../../../../axiosInterceptor'
import { apiURL } from '../../../../helper'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import VendorModal from './VendorModal'
import { useNotify } from '../../../utils/NotificationProvider'

const SuggestedVendors = () => {
    const [allVendors, setAllVendors] = useState([])
    const user = useSelector((state) => state?.user?.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const notify = useNotify()

    function getVendors() {
        return api.get(`${apiURL}/vendors/get-all-vendors`).then((res) => {
            setAllVendors(res.data)
        })
    }

    function activateDeactivateVendor(isActive, uuid) {
        const body = {
            isActive,
            uuid
        }
        return api.post(`${apiURL}/vendors/activate-deactivate-vendor`, body).then((res) => {
            notify.success({
                message: 'Success!',
                description: res.data.msg,
                placement: 'topRight',
            });
            getVendors()
        })
    }

    useEffect(() => {
        getVendors()
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
                                    onClick={() => activateDeactivateVendor(false, record.uuid)}
                                >Deactivate</Tag>
                                :
                                <Tag color='green' className='hover:cursor-pointer'
                                    onClick={() => activateDeactivateVendor(true, record.uuid)}
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
                <p className='font-serif text-heading'>Vendors</p>
                <Button
                    type="primary"
                    className="border-none h-12 text-base font-small w-[200px]"
                    size="small"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Vendor
                </Button>
            </div>
            <Table columns={columns} dataSource={allVendors} className='mt-3' />
            <VendorModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getAllVendors={getVendors} selectedItem={selectedItem} />
        </div>
    )
}

export default SuggestedVendors