import { ArrowRightOutlined, CalendarFilled, CalendarOutlined, ClockCircleFilled, ClockCircleOutlined, EditOutlined, GroupOutlined, PinterestFilled, PlusOutlined, RightOutlined, SendOutlined, TeamOutlined, WalletFilled } from '@ant-design/icons'
import { Button, Col, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import EventDetailsModal from './EventDetailsModal'
import api from '../../../../axiosInterceptor'
import { useSelector } from 'react-redux'

const Home = () => {

    // const events = [1, 2]
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const user = useSelector((state) => state?.user?.user)
    const [events, setEvents] = useState([])
    const [checkList, setCheckList] = useState([])
    const [selectedEvent, setSelectedEvent] = useState({})

    function getUserEvents() {
        return api.get(`/events/get-user-events?userId=${user?.uuid}`)
            .then((res) => setEvents(res.data))
    }

    useEffect(() => {
        getUserEvents()
    }, [])


    const checklistColumns = [
        {
            title: 'Task',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Event',
            dataIndex: 'event',
            key: 'event',
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
        }
    ];

    function getUserChecklist() {
        return api.get(`/checklist/get-user-checklist?userId=${user?.uuid}`)
            .then((res) => setCheckList(res.data))
    }

    useEffect(() => {
        getUserChecklist()
    }, [])

    return (
        <div>
            <NavLink to={'/dashboard/event/create/1'}>
                <Button
                    type="primary"
                    className="mt-5 border-none h-12 text-base font-medium"
                >
                    <PlusOutlined />
                    Add Event
                </Button>
            </NavLink>
            <Row className='gap-4 mt-5'>
                {
                    events.map((item) => {
                        return (
                            <Col key={item} className='bg-white p-5 rounded-xl' md={4}>
                                <div className='flex justify-between items-center'>
                                    <p className='font-sans text-[18px]'>{item?.eventType}</p>
                                    <RightOutlined className='bg-primary rounded p-3 hover:cursor-pointer' onClick={() => navigate(`/dashboard/event/${item.uuid}`)} />
                                </div>
                                <div className='flex mt-5 justify-between'>
                                    <div className='flex'>
                                        <CalendarFilled className='bg-primary p-3 rounded-xl' />
                                        <div className='ml-5'>
                                            <p className='text-[12px] font-medium'>Date</p>
                                            <p className='font-medium text-gray-800'>{item.eventDate}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <EditOutlined onClick={() => { setIsModalOpen(true); setSelectedEvent(item) }} className='hover:cursor-pointer p-3 rounded-xl' />
                                    </div>
                                </div>
                                <div className='flex mt-3 justify-between'>
                                    <div className='flex'>
                                        <ClockCircleFilled className='bg-primary p-3 rounded-xl' />
                                        <div className='ml-5'>
                                            <p className='text-[12px] font-medium'>Time</p>
                                            <p className='font-medium text-gray-800'>{item.eventTime}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <EditOutlined onClick={() => { setIsModalOpen(true); setSelectedEvent(item) }} className='hover:cursor-pointer p-3 rounded-xl' />
                                    </div>
                                </div>
                                <div className='flex mt-3 justify-between'>
                                    <div className='flex'>
                                        <SendOutlined className='bg-primary p-3 rounded-xl' />
                                        <div className='ml-5'>
                                            <p className='text-[12px] font-medium'>Location</p>
                                            <p className='font-medium text-gray-800'>{item.eventLocation}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <EditOutlined onClick={() => { setIsModalOpen(true); setSelectedEvent(item) }} className='hover:cursor-pointer p-3 rounded-xl' />
                                    </div>
                                </div>
                                <div className='flex mt-3 justify-between'>
                                    <div className='flex'>
                                        <WalletFilled className='bg-primary p-3 rounded-xl' />
                                        <div className='ml-5'>
                                            <p className='text-[12px] font-medium'>Budget</p>
                                            <p className='font-medium text-gray-800'>${item.eventBudget}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <EditOutlined onClick={() => { setIsModalOpen(true); setSelectedEvent(item) }} className='hover:cursor-pointer p-3 rounded-xl' />
                                    </div>
                                </div>
                                <div className='flex mt-3 justify-between'>
                                    <div className='flex'>
                                        <TeamOutlined className='bg-primary p-3 rounded-xl' />
                                        <div className='ml-5'>
                                            <p className='text-[12px] font-medium'>Guests</p>
                                            <p className='font-medium text-gray-800'>{item.guestCount}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <EditOutlined onClick={() => { setIsModalOpen(true); setSelectedEvent(item) }} className='hover:cursor-pointer p-3 rounded-xl' />
                                    </div>
                                </div>

                            </Col>
                        )
                    })
                }
            </Row>

            <div className='mt-5 bg-white rounded-xl p-5'>
                <p className='font-sans text-[20px] mt-3'>My checklist</p>
                {
                    checkList?.length > 0 ?
                        <Table columns={checklistColumns} dataSource={checkList} />
                        :
                        <p className='text-center font-serif text-[16px]'>You don't have any tasks right now</p>
                }
                <NavLink to={'/dashboard/checklist'}>
                    <p className='font-sans text-red-400 hover:cursor-pointer'>Open checklist <ArrowRightOutlined className='text-[14px]' /></p>
                </NavLink>
            </div>

            <div className='mt-5 bg-white rounded-xl p-5'>
                <p className='font-sans text-[20px]'>Budget Overview</p>
            </div>
            <EventDetailsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
        </div>
    )
}

export default Home