import { Button, Col, Empty, Rate, Row, Segmented, Space, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import GeneralCard from '../../../components/auth/GeneralCard'
import api from '../../../../axiosInterceptor'
import { apiURL } from '../../../../helper'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import VendorModal from './ReviewModal'
import { useNotify } from '../../../utils/NotificationProvider'
import { useNavigate } from 'react-router-dom'

const Reviews = () => {
    const [allReviews, setAllReviews] = useState([])
    const user = useSelector((state) => state?.user?.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState({})
    const notify = useNotify()
    const navigate = useNavigate()

    function getAllReviews() {
        return api.get(`${apiURL}/reviews/get-all-reviews`).then((res) => {
            setAllReviews(res.data)
        })
    }

    function activateDeactivateReview(isActive, uuid) {
        const body = {
            isActive,
            uuid
        }
        return api.post(`${apiURL}/reviews/activate-deactivate-review`, body).then((res) => {
            notify.success({
                message: 'Success!',
                description: res.data.msg,
                placement: 'topRight',
            });
            getAllReviews()
        })
    }

    useEffect(() => {
        getAllReviews()
    }, [])

    const columns = [
        {
            title: 'Username',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (_, record) => (
                <Rate value={record.rating} disabled />
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <>
                        <Tag color='purple' className='hover:cursor-pointer'
                            onClick={() => navigate(`/service-details/${record.serviceId}`)}
                        >View Service</Tag>
                        {
                            record?.isActive ?
                                <Tag color='red' className='hover:cursor-pointer'
                                    onClick={() => activateDeactivateReview(false, record.uuid)}
                                >Deactivate</Tag>
                                :
                                <Tag color='green' className='hover:cursor-pointer'
                                    onClick={() => activateDeactivateReview(true, record.uuid)}
                                >Activate</Tag>
                        }
                    </>
                    {/* <EditOutlined style={{ cursor: 'pointer' }}
                        onClick={() => { setIsModalOpen(true); setSelectedItem(record) }}
                    /> */}
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
                <p className='font-serif text-heading'>Reviews</p>
            </div>
            <Table columns={columns} dataSource={allReviews} className='mt-3' />
            <VendorModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getAllVendors={getAllReviews} selectedItem={selectedItem} />
        </div>
    )
}

export default Reviews