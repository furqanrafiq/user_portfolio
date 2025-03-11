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
                        <AllServices
                            isDisabled={false}
                            handleService={handleService}
                        />
                    </div>

                    <Form.Item
                        name="description"
                        rules={[
                            { required: true, message: 'Please enter description' }
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Description"
                            size="large"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="price"
                        rules={[
                            { required: true, message: 'Please enter price' }
                        ]}
                    >
                        <Input
                            placeholder="Price"
                            size="large"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            // size="large"
                            block
                            loading={loading}
                            disabled={loading}
                            className="mt-5 border-none h-12 text-base font-medium"
                        >
                            Add Service
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddServiceModal;