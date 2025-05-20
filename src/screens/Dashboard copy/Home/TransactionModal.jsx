import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { apiURL, paymentTypes, taskTypes, titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';

function TransactionModal({ isModalOpen, setIsModalOpen, selectedTransaction, userEvents, getUserTransactions, setSelectedTransaction, getUserEvents }) {
    const [loading, setLoading] = useState(false)
    const notify = useNotify()
    const user = useSelector((state) => state?.user?.user)
    const [form] = Form.useForm()
    const [userVendors, setUserVendors] = useState([])

    function getUserVendors() {
        return api.get(`/bookings/get-user-vendors?userId=${user?.uuid}`)
            .then((res) => setUserVendors(res.data))
    }

    function deleteTransaction(transactionId) {
        return api.post(`/transactions/delete-transaction?transactionId=${transactionId}`)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setIsModalOpen(false)
                form.resetFields()
                getUserTransactions()
                getUserEvents()
            }).catch((res) => {
                notify.error({
                    message: 'Error',
                    description: res.response.data.msg,
                    placement: 'topRight',
                });
            })
    }

    useEffect(() => {
        getUserVendors()
    }, [])

    useEffect(() => {
        if (selectedTransaction) {
            form.setFieldsValue({
                vendorName: selectedTransaction?.vendorName,
                eventId: selectedTransaction?.eventId,
                category: selectedTransaction?.category,
                transactionName: selectedTransaction?.transactionName,
                transactionDate: moment(selectedTransaction.transactionDate),
                amount: selectedTransaction?.amount,
                paymentType: selectedTransaction?.paymentType,
                note: selectedTransaction?.note,
            });
        }
    }, [selectedTransaction, form]);

    const onFinish = (values) => {
        const body = { ...values }
        body.userId = user?.uuid;
        setLoading(true)
        let url = ""
        if (selectedTransaction?.uuid) {
            body.uuid = selectedTransaction?.uuid
            url = 'update-transaction'
        } else {
            url = 'insert-transaction'
        }
        return api.post(`${apiURL}/transactions/${url}`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                setIsModalOpen(false)
                getUserTransactions()
                form.resetFields()
                setSelectedTransaction({})
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

    return (
        <>
            <Modal title="Transaction Details" open={isModalOpen} footer={[]} closable={false}>
                <Form
                    name="signin"
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <Form.Item
                        name="vendorName"
                        rules={[
                            { required: true, message: 'Please select vendor' }
                        ]}
                        label="Vendor"
                    >
                        <Select placeholder="Select vendor" className='w-full'
                            options={userVendors?.map((item) => ({
                                value: item.ServiceDetails.serviceName,
                                label: item.ServiceDetails.serviceName,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="eventId"
                        rules={[
                            { required: true, message: 'Please select event' }
                        ]}
                        label="Event"
                    >
                        <Select placeholder="Select event" className='w-full'
                            options={userEvents?.map((item) => ({
                                value: item.uuid,
                                label: item.eventType,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        rules={[
                            { required: true, message: 'Please select category' }
                        ]}
                        label="Category"
                    >
                        <Select placeholder="Select Category" className='w-full'
                            options={taskTypes?.map((item) => ({
                                value: item.name,
                                label: item.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="transactionName"
                        rules={[
                            { required: true, message: 'Please enter transaction name' }
                        ]}
                        label="Transaction Name"
                    >
                        <Input className='w-full' />
                    </Form.Item>
                    <Form.Item
                        name="transactionDate"
                        rules={[
                            { required: true, message: 'Please enter transaction date' }
                        ]}
                        label="Transaction Date"
                    >
                        <DatePicker className='w-full' />
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        rules={[
                            { required: true, message: 'Please enter transaction amount' }
                        ]}
                        label="Amount"
                    >
                        <Input className='w-full' />
                    </Form.Item>
                    <Form.Item
                        name="paymentType"
                        rules={[
                            { required: true, message: 'Please select payment type' }
                        ]}
                        label="Payment Type"
                    >
                        <Select placeholder="Select Payment Type" className='w-full'
                            options={paymentTypes?.map((item) => ({
                                value: item.name,
                                label: item.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="note"
                        label="Note"
                    >
                        <Input.TextArea className='w-full' rows={3} />
                    </Form.Item>
                    <div className='flex items-center justify-end'>
                        <Form.Item>
                            <Button
                                type="secondary"
                                loading={loading}
                                disabled={loading}
                                className="mt-5 border-none h-6 font-medium"
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedTransaction({})
                                }}
                            >
                                Close
                            </Button>
                        </Form.Item>
                        {
                            selectedTransaction?.uuid &&
                            <Form.Item>
                                <Button
                                    type="secondary"
                                    loading={loading}
                                    disabled={loading}
                                    className="mt-5 border-none h-6 font-medium"
                                    onClick={() => {
                                        deleteTransaction(selectedTransaction?.uuid);
                                    }}
                                >
                                    Delete Transaction
                                </Button>
                            </Form.Item>
                        }
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                disabled={loading}
                                className="mt-5 border-none h-12 font-medium"
                            >
                                Save
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
    );
};

export default TransactionModal;