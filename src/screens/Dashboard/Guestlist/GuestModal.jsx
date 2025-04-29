import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { apiURL, titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';

function GuestModal({ isModalOpen, setIsModalOpen, getUserGuests }) {
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
        return api.post(`${apiURL}/guests/insert-user-guests`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                setIsModalOpen(false)
                getUserGuests()
                values = {}
            })
            .catch((res) => {
                console.log(res)
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
                    {/* <Form.Item
                        name="title"
                        rules={[
                            { required: true, message: 'Please enter title' }
                        ]}
                    >
                        <p>Guest Title</p>
                        <Select placeholder="Select title" className='w-full'
                            options={titleTypes?.map((item) => ({
                                value: item.name,
                                label: item.name,
                            }))}
                        />
                    </Form.Item> */}
                    <Form.Item
                        name="firstName"
                        rules={[
                            { required: true, message: 'Please enter first name' }
                        ]}
                        label="First Name"
                    >
                        <Input placeholder='First Name' />
                    </Form.Item>
                    <Form.Item
                        name="lastName"
                        rules={[
                            { required: true, message: 'Please enter last name' }
                        ]}
                        label="Last Name"
                    >
                        <Input placeholder='Last Name' />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        rules={[
                            { required: true, message: 'Please enter phone number' }
                        ]}
                        label="Phone Number"
                    >
                        <Input placeholder='Phone Number' />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter email' }
                        ]}
                        label="Email"
                    >
                        <Input placeholder='Email' />
                    </Form.Item>

                    {/* <div className='mt-3'>
                    <p>Invited To</p>
                    <Checkbox.Group options={userEvents?.map((item) => ({
                        value: item.eventType,
                        label: item.eventType,
                    }))} />
                </div> */}
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

export default GuestModal;