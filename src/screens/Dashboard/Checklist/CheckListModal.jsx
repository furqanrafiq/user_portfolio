import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { apiURL, taskTypes, titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';

function CheckListModal({ isModalOpen, setIsModalOpen, getUserChecklist }) {
    const [loading, setLoading] = useState(false)
    const notify = useNotify()
    const user = useSelector((state) => state?.user?.user)
    const [event, setEvent] = useState({})
    const [userEvents, setUserEvents] = useState([])

    function getUserEvents() {
        return api.get(`/events/get-user-events?userId=${user?.uuid}`)
            .then((res) => setUserEvents(res.data))
    }

    useEffect(() => {
        getUserEvents()
    }, [])

    const onFinish = (values) => {
        console.log(values)
        const body = { ...values }
        body.userId = user?.uuid;
        setLoading(true)
        return api.post(`${apiURL}/checklist/insert-user-checklist`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                setIsModalOpen(false)
                getUserChecklist()
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
            <Modal title="Guest Details" open={isModalOpen} footer={[]} closable={false}>
                <Form
                    name="signin"
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <Form.Item
                        name="description"
                        rules={[
                            { required: true, message: 'Please enter task description' }
                        ]}
                        label="Description"
                    >
                        <Input.TextArea rows={3} placeholder='Description' />
                    </Form.Item>
                    <Form.Item
                        name="category"
                        rules={[
                            { required: true, message: 'Please enter task category' }
                        ]}
                        label="Category"
                    >
                        <Select placeholder="Select category" className='w-full'
                            options={taskTypes?.map((item) => ({
                                value: item.name,
                                label: item.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="event"
                        rules={[
                            { required: true, message: 'Please enter task event' }
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
                        name="dueDate"
                        rules={[
                            { required: true, message: 'Please enter task Due Date' }
                        ]}
                        label="Due Date"
                    >
                        <DatePicker className='w-full' />
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

export default CheckListModal;