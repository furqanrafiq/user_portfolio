import React, { useEffect, useState } from 'react'
import { Button, Space, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, StarFilled, StarOutlined } from '@ant-design/icons';
import noData from '../../../assets/no-data.png'
import api from '../../../../axiosInterceptor';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useNotify } from '../../../utils/NotificationProvider';
import PaymentDetailsModal from './PaymentDetailsModal';
import { apiURL } from '../../../../helper';

const PaymentDetails = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user = useSelector((state) => state?.user?.user)
    const [userPaymentDetails, setUserPaymentDetails] = useState([])
    const [selectedItem, setSelectedItem] = useState({})
    const notify = useNotify()

    const CustomNoData = () => (
        <div className='p-5'>
            <p className='text-[18px] font-sans mb-2' style={{ color: 'gray' }}>You don’t have any payment details added</p>
            <Button type="primary" icon={<PlusOutlined />} className='mt-3' onClick={() => setIsModalOpen(true)}>
                Add Payment Details
            </Button>
        </div>
    );

    function deletePaymentDetails(paymentId) {
        return api.post(`/user-payment/delete-user-payment-details?paymentId=${paymentId}`)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                getUserPaymentDetails()
            }).catch((res) => {
                notify.error({
                    message: 'Error',
                    description: res.response.data.msg,
                    placement: 'topRight',
                });
            })
    }


    const updatePaymentDetail = (record) => {
        const body = { ...record }
        body.isPrimary = !record.isPrimary
        return api.post(`${apiURL}/user-payment/update-user-payment-details`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                getUserPaymentDetails()
            })
            .catch((res) => {
                notify.error({
                    message: 'Error',
                    description: res.response.data.msg,
                    placement: 'topRight',
                });
            })
    }



    const columns = [
        {
            title: 'Account Name',
            dataIndex: 'accountName',
            key: 'accountName',
            render: (_, record) => (
                <Space>
                    {
                        record?.isPrimary ?
                            <StarFilled className='mr-2 cursor-pointer' style={{ color: "orange" }} onClick={() => updatePaymentDetail(record)} />
                            :
                            <StarOutlined className='mr-2 cursor-pointer' onClick={() => updatePaymentDetail(record)} />
                    }
                    {record?.accountName}
                </Space>
            ),
        },
        {
            title: 'Bank Name',
            dataIndex: 'bankName',
            key: 'bankName',
        },
        {
            title: 'Account Number',
            dataIndex: 'accountNumber',
            key: 'accountNumber',
        },
        {
            title: 'IBAN',
            dataIndex: 'iban',
            key: 'iban',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ cursor: 'pointer' }} onClick={() => { setIsModalOpen(true); setSelectedItem(record) }} />
                    <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => deletePaymentDetails(record.uuid)} />
                </Space>
            ),
        },
    ];

    function getUserPaymentDetails() {
        return api.get(`/user-payment/get-user-payment-details?userId=${user?.uuid}`)
            .then((res) => setUserPaymentDetails(res.data))
    }

    useEffect(() => {
        getUserPaymentDetails()
    }, [])

    return (
        <div>
            <div className='flex justify-between mb-5'>
                <p className='font-serif text-heading'>Payment Details</p>
                <Button
                    type="primary"
                    className="border-none h-12 text-base font-small w-[200px]"
                    size="small"
                    onClick={() => setIsModalOpen(true)}
                >
                    Add Payment Details
                </Button>
            </div>
            <Table columns={columns} dataSource={userPaymentDetails} locale={{ emptyText: <CustomNoData /> }} />
            <PaymentDetailsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} getUserPaymentDetails={getUserPaymentDetails} selectedItem={selectedItem} />
        </div>
    )
}

export default PaymentDetails