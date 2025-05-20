import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { apiURL, taskTypes, titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';

function PaymentDetailsModal({ isModalOpen, setIsModalOpen, getUserPaymentDetails, selectedItem }) {
    const [loading, setLoading] = useState(false)
    const notify = useNotify()
    const user = useSelector((state) => state?.user?.user)
    const [event, setEvent] = useState({})
    const [userEvents, setUserEvents] = useState([])
    const [form] = Form.useForm()

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue({
                accountName: selectedItem?.accountName,
                bankName: selectedItem?.bankName,
                accountNumber: selectedItem?.accountNumber,
                iban: selectedItem?.iban,
            });
        }
    }, [selectedItem, form]);

    const onFinish = (values) => {
        const body = { ...values }
        body.userId = user?.uuid;
        setLoading(true)
        let url = ""
        if (selectedItem?.uuid) {
            body.uuid = selectedItem?.uuid
            url = 'update-user-payment-details'
        } else {
            url = 'insert-user-payment-details'
        }
        return api.post(`${apiURL}/user-payment/${url}`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                setIsModalOpen(false)
                getUserPaymentDetails()
                form.resetFields()
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
            <Modal title="Payment Details" open={isModalOpen} footer={[]} closable={false}>
                <Form
                    name="signin"
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <Form.Item
                        name="accountName"
                        rules={[
                            { required: true, message: 'Please enter account name' }
                        ]}
                        label="Account Name"
                    >
                        <Input placeholder='Account Name' />
                    </Form.Item>

                    <Form.Item
                        name="bankName"
                        rules={[
                            { required: true, message: 'Please enter bank name' }
                        ]}
                        label="Bank Name"
                    >
                        <Input placeholder='Bank Name' />
                    </Form.Item>

                    <Form.Item
                        name="accountNumber"
                        rules={[
                            { required: true, message: 'Please enter account number' }
                        ]}
                        label="Account Number"
                    >
                        <Input placeholder='Account Number' />
                    </Form.Item>

                    <Form.Item
                        name="iban"
                        rules={[
                            { required: true, message: 'Please enter account iban' }
                        ]}
                        label="Account IBAN"
                    >
                        <Input placeholder='Account IBAN' />
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
                                    form.resetFields()
                                }}
                            >
                                Close
                            </Button>
                        </Form.Item>
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

export default PaymentDetailsModal;