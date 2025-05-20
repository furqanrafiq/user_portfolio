import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Rate, Row, Select, TimePicker } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { apiURL } from '../../../helper';
import api from '../../../axiosInterceptor';
import { useNotify } from '../../utils/NotificationProvider';

function ReviewModal({ isModalOpen, setIsModalOpen, serviceId, getServiceReviews }) {
    const [loading, setLoading] = useState(false)
    const notify = useNotify()
    const user = useSelector((state) => state?.user?.user)
    const [event, setEvent] = useState({})
    const [userEvents, setUserEvents] = useState([])

    const onFinish = (values) => {
        console.log(values)
        const body = { ...values }
        body.userId = user?.uuid;
        body.userName = user?.name;
        body.serviceId = serviceId;
        setLoading(true)
        return api.post(`${apiURL}/reviews/insert-review`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                setIsModalOpen(false)
                getServiceReviews()
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
            <Modal title="Give Review" open={isModalOpen} footer={[]} closable={false}>
                <Form
                    name="signin"
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <Form.Item
                        name="description"
                        rules={[
                            { required: true, message: 'Please enter review' }
                        ]}
                        label="Review"
                    >
                        <Input.TextArea rows={3} placeholder='Enter review' />
                    </Form.Item>
                    <Form.Item
                        name="rating"
                        rules={[
                            { required: true, message: 'Please enter review' }
                        ]}
                        label="Rating"
                    >
                        <Rate />
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