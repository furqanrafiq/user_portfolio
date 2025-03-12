import React, { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import AllServices from '../../../components/dropdowns/allServices';
import axios from 'axios';
import { apiURL } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';

function AddServiceModal({ isModalOpen, setIsModalOpen }) {
    const [service, setService] = useState(Object)
    const [loading, setLoading] = useState(false)
    const notify = useNotify()
    const user = useSelector((state) => state?.user?.user)

    function handleService(data) {
        setService(data)
    }

    const onFinish = (values) => {
        const body = { ...values }
        body.service = service
        body.userId = user?.id;
        setLoading(true)
        return axios.post(`${apiURL}/api/services/insert-user-service`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
            })
            .catch((error) => {
                notify.error({
                    message: 'Error',
                    description: error.response?.data?.msg || 'Something went wrong',
                    placement: 'topRight',
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <>
            <Modal title="Add Service" open={isModalOpen} footer={[]}>
                <Form
                    name="signin"
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <div className="mb-5">
                        <p className='mb-2'>Service</p>
                        <AllServices
                            isDisabled={false}
                            handleService={handleService}
                        />
                    </div>

                    <Form.Item
                        name="Name"
                        rules={[
                            { required: true, message: 'Please enter service name' }
                        ]}
                        label="Name"
                    >
                        <Input
                            placeholder="Name"
                            size="medium"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[
                            { required: true, message: 'Please enter description' }
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Description"
                            size="medium"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        rules={[
                            { required: true, message: 'Please enter price' }
                        ]}
                        label="Price"
                    >
                        <Input
                            type='number'
                            placeholder="Price"
                            size="medium"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className='text-end'>
                            <Button
                                type="secondary"
                                loading={loading}
                                disabled={loading}
                                className="mt-5 border-none h-6 font-medium"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={loading}
                                disabled={loading}
                                className="mt-5 border-none h-12 font-medium"
                            >
                                Add Service
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddServiceModal;