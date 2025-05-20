import React, { useEffect, useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import AllServices from '../../../components/dropdowns/allServices';
import axios from 'axios';
import { apiURL, eventTypes, mapApiKey } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import moment from 'moment';
import api from '../../../../axiosInterceptor';
import dayjs from 'dayjs';

function EventDetailsModal({ isModalOpen, setIsModalOpen, selectedEvent, getUserEvents }) {
    const [loading, setLoading] = useState(false)
    const notify = useNotify()
    const user = useSelector((state) => state?.user?.user)
    const [event, setEvent] = useState({})
    const [form] = useForm()

    useEffect(() => {
        if (selectedEvent) {
            form.setFieldsValue({
                eventType: selectedEvent?.eventType,
                guestCount: selectedEvent?.guestCount,
                eventBudget: selectedEvent.eventBudget,
                eventLocation: selectedEvent.eventLocation,
                eventDate: dayjs(selectedEvent.eventDate)
            });
        }
    }, [selectedEvent, form]);

    const onFinish = (values) => {
        const body = { ...values }
        body.userId = user?.uuid;
        body.eventDate = dayjs(values.eventDate).format('YYYY-MM-DD HH:mm:ss')
        setLoading(true)

        let url = ""
        if (selectedEvent?.uuid) {
            body.uuid = selectedEvent?.uuid
            url = 'update-user-event'
        } else {
            url = 'insert-user-event'
        }

        return api.post(`${apiURL}/events/${url}`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                setIsModalOpen(false)
                getUserEvents()
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
            <Modal title="Event Details" open={isModalOpen} footer={[]} closable={false}>
                <Form
                    name="signin"
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <Form.Item
                        name="eventType"
                        rules={[
                            { required: true, message: 'Please select event type' }
                        ]}
                        label="Event Type"
                    >
                        <Select placeholder="Select event type" className='w-full'
                            options={eventTypes?.map((item) => ({
                                value: item.name,
                                label: item.name,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="guestCount"
                        rules={[
                            { required: true, message: 'Please enter guest count' }
                        ]}
                        label="Guest Count"
                    >
                        <Input placeholder='Guest Count' />
                    </Form.Item>
                    <Form.Item
                        name="eventBudget"
                        rules={[
                            { required: true, message: 'Please enter event budget' }
                        ]}
                        label="Event Budget"
                    >
                        <Input prefix={"PKR"} placeholder='Event Budget' />
                    </Form.Item>
                    <Form.Item
                        name="eventLocation"
                        rules={[
                            { required: true, message: 'Please enter event location' }
                        ]}
                        label="Event Location"
                    >
                        <Input placeholder='Event Location' />
                    </Form.Item>
                    <Form.Item
                        name="eventDate"
                        rules={[
                            { required: true, message: 'Please select event date' }
                        ]}
                        label="Event Date and Time"
                    >
                        <DatePicker showTime className='w-full' />
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
            </Modal >
        </>
    );
};

export default EventDetailsModal;