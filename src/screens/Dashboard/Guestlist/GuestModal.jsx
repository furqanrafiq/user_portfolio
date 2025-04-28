import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';

function GuestModal({ isModalOpen, setIsModalOpen, selectedEvent, setSelectedEvent }) {
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

    useEffect(() => {
        if (selectedEvent) {
            setEvent(selectedEvent)
        }
    }, [selectedEvent])

    return (
        <>
            <Modal title="Guest Details" open={isModalOpen} footer={[]} closable={false}>
                <div className='mt-3'>
                    <p>Guest Name</p>
                    <Select placeholder="Select title" className='w-full'
                        options={titleTypes?.map((item) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                        value={event?.eventType}
                    />
                </div>
                <div className='mt-3'>
                    <p>First Name</p>
                    <Input value={event?.guestCount} placeholder='First Name' />
                </div>
                <div className='mt-3'>
                    <p>Last Name</p>
                    <Input value={event?.eventBudget} placeholder='Last Name' />
                </div>
                <div className='mt-3'>
                    <p>Phone Number</p>
                    <Input value={event?.eventLocation} placeholder='Phone Number' />
                </div>
                <div className='mt-3'>
                    <p>Email</p>
                    <Input value={event?.eventLocation} placeholder='Email' />
                </div>
                <div className='mt-3'>
                    <p>Invited To</p>
                    <Checkbox.Group options={userEvents?.map((item) => ({
                        value: item.eventType,
                        label: item.eventType,
                    }))} />
                </div>
                <div className='text-end'>
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
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        disabled={loading}
                        className="mt-5 border-none h-12 font-medium"
                    >
                        Save
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default GuestModal;