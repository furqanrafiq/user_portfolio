import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { apiURL, taskTypes, titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';

function ReviewModal({ isModalOpen, setIsModalOpen, getAllVendors, selectedItem }) {
    const [loading, setLoading] = useState(false)
    const notify = useNotify()
    const [form] = Form.useForm()

    useEffect(() => {
        if (selectedItem) {
            form.setFieldsValue({
                name: selectedItem?.name,
                email: selectedItem?.email,
                phoneNumber: selectedItem.phoneNumber,
            });
        }
    }, [selectedItem, form]);

    const onFinish = (values) => {
        const body = { ...values }
        setLoading(true)
        let url = ""
        if (selectedItem?.uuid) {
            body.uuid = selectedItem?.uuid
            url = 'update-vendor'
        } else {
            url = 'insert-vendor'
        }
        return api.post(`${apiURL}/vendors/${url}`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                setIsModalOpen(false)
                getAllVendors()
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
            <Modal title="Vendor Details" open={isModalOpen} footer={[]} closable={false}>
                <Form
                    name="signin"
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: 'Please enter name' }
                        ]}
                        label="Name"
                    >
                        <Input placeholder='Name' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter email' }
                        ]}
                        label="Email"
                    >
                        <Input placeholder='Name' />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        rules={[
                            { required: true, message: 'Please enter phoneNumber' }
                        ]}
                        label="Phone Number"
                    >
                        <Input placeholder='Name' />
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

export default ReviewModal;