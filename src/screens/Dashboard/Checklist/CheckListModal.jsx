import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { apiURL, taskTypes, titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';

function CheckListModal({ isModalOpen, setIsModalOpen, getUserChecklist, selectedChecklist }) {
    const [loading, setLoading] = useState(false)
    const notify = useNotify()
    const user = useSelector((state) => state?.user?.user)
    const [event, setEvent] = useState({})
    const [userEvents, setUserEvents] = useState([])
    const [form] = Form.useForm()

    useEffect(() => {
        if (selectedChecklist) {
            form.setFieldsValue({
                description: selectedChecklist?.description,
                category: selectedChecklist?.category,
                dueDate: moment(selectedChecklist.dueDate),
                event: selectedChecklist.eventDetails?.eventType,
            });
        }
    }, [selectedChecklist, form]);

    function getUserEvents() {
        return api.get(`/events/get-user-events?userId=${user?.uuid}`)
            .then((res) => setUserEvents(res.data))
    }

    useEffect(() => {
        getUserEvents()
    }, [])

    const onFinish = (values) => {
        const body = { ...values }
        body.userId = user?.uuid;
        setLoading(true)
        let url = ""
        if (selectedChecklist?.uuid) {
            body.uuid = selectedChecklist?.uuid
            url = 'update-user-checklist'
        } else {
            url = 'insert-user-checklist'
        }
        return api.post(`${apiURL}/checklist/${url}`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                setIsModalOpen(false)
                getUserChecklist()
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
            <Modal title="Checklist" open={isModalOpen} footer={[]} closable={false}>
                <Form
                    name="signin"
                    form={form}
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

export default CheckListModal;