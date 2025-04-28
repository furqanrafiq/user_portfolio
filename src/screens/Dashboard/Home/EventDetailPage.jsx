import { CalendarFilled, ClockCircleFilled, DeleteOutlined, EditOutlined, LeftOutlined, RightOutlined, SendOutlined, TeamOutlined, WalletFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../../axiosInterceptor'
import { apiURL } from '../../../../helper'

const EventDetailPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const [event, setEvent] = useState({})

    function getEventDetails() {
        return api.get(`${apiURL}/events/event-details?eventId=${params.eventId}`)
            .then((res) => setEvent(res.data))
    }

    useEffect(() => {
        getEventDetails()
    }, [])

    return (
        <div className='container mx-auto my-5'>
            <div className='flex items-center'>
                <LeftOutlined className='mr-3' />
                <p className='font-serif text-[20px]'>{event.eventType}</p>
            </div>

            <div className='mt-5 bg-white p-5 rounded-xl'>
                <div className='flex justify-between items-center'>
                    <p className='font-sans text-[18px]'>{event.eventType}</p>
                    <div>
                        <EditOutlined className='bg-primary rounded-[50%] p-3 hover:cursor-pointer mr-3' />
                        <DeleteOutlined className='bg-primary rounded-[50%] p-3 hover:cursor-pointer' />
                    </div>
                </div>
                <div className='flex mt-5 justify-between'>
                    <div className='flex'>
                        <CalendarFilled className='bg-primary p-3 rounded-xl' />
                        <div className='ml-5'>
                            <p className='text-[12px] font-medium'>Date</p>
                            <p className='font-medium text-gray-800'>{event.eventDate}</p>
                        </div>
                    </div>
                    <div>
                        <EditOutlined onClick={() => setIsModalOpen(true)} className='hover:cursor-pointer p-3 rounded-xl' />
                    </div>
                </div>
                <div className='flex mt-3 justify-between'>
                    <div className='flex'>
                        <ClockCircleFilled className='bg-primary p-3 rounded-xl' />
                        <div className='ml-5'>
                            <p className='text-[12px] font-medium'>Time</p>
                            <p className='font-medium text-gray-800'>{event.eventTime}</p>
                        </div>
                    </div>
                    <div>
                        <EditOutlined onClick={() => setIsModalOpen(true)} className='hover:cursor-pointer p-3 rounded-xl' />
                    </div>
                </div>
                <div className='flex mt-3 justify-between'>
                    <div className='flex'>
                        <SendOutlined className='bg-primary p-3 rounded-xl' />
                        <div className='ml-5'>
                            <p className='text-[12px] font-medium'>Location</p>
                            <p className='font-medium text-gray-800'>{event.eventLocation}</p>
                        </div>
                    </div>
                    <div>
                        <EditOutlined onClick={() => setIsModalOpen(true)} className='hover:cursor-pointer p-3 rounded-xl' />
                    </div>
                </div>
                <div className='flex mt-3 justify-between'>
                    <div className='flex'>
                        <WalletFilled className='bg-primary p-3 rounded-xl' />
                        <div className='ml-5'>
                            <p className='text-[12px] font-medium'>Budget</p>
                            <p className='font-medium text-gray-800'>${event.eventBudget}</p>
                        </div>
                    </div>
                    <div>
                        <EditOutlined onClick={() => setIsModalOpen(true)} className='hover:cursor-pointer p-3 rounded-xl' />
                    </div>
                </div>
                <div className='flex mt-3 justify-between'>
                    <div className='flex'>
                        <TeamOutlined className='bg-primary p-3 rounded-xl' />
                        <div className='ml-5'>
                            <p className='text-[12px] font-medium'>Guests</p>
                            <p className='font-medium text-gray-800'>{event.guestCount}</p>
                        </div>
                    </div>
                    <div>
                        <EditOutlined onClick={() => setIsModalOpen(true)} className='hover:cursor-pointer p-3 rounded-xl' />
                    </div>
                </div>
            </div>

            <div className='mt-5 bg-white p-5 rounded-xl'>
                <p className='font-sans text-[18px]'>Guest Status</p>
            </div>

            <div className='mt-5 bg-white p-5 rounded-xl'>
                <p className='font-sans text-[18px]'>Recent Transactions</p>
            </div>

            <div className='mt-5 bg-white p-5 rounded-xl'>
                <p className='font-sans text-[18px]'>Vendor Manager</p>
            </div>
        </div>
    )
}

export default EventDetailPage