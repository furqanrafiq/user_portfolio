import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Select, TimePicker } from 'antd';
import { titleTypes } from '../../../../helper';
import { useNotify } from '../../../utils/NotificationProvider';
import { useSelector } from 'react-redux';
import moment from 'moment';
import api from '../../../../axiosInterceptor';

function CheckListModal({ isModalOpen, setIsModalOpen, selectedEvent, setSelectedEvent }) {
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
                    <p>Task Description</p>
                    <Input value={event?.guestCount} placeholder='Task Description' />
                </div>
                <div className='mt-3'>
                    <p>Category</p>
                    <Select placeholder="Select category" className='w-full'
                        options={titleTypes?.map((item) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                        value={event?.eventType}
                    />
                </div>
                <div className='mt-3'>
                    <p>Event</p>
                    <Select placeholder="Select Event" className='w-full'
                        options={titleTypes?.map((item) => ({
                            value: item.name,
                            label: item.name,
                        }))}
                        value={event?.eventType}
                    />
                </div>
                <div className='mt-3'>
                    <p>Due Date</p>
                    <Input value={event?.eventLocation} placeholder='Due Date' />
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

export default CheckListModal;