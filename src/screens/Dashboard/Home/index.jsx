import { ArrowRightOutlined, CalendarFilled, CalendarOutlined, ClockCircleFilled, ClockCircleOutlined, EditOutlined, GroupOutlined, PinterestFilled, PlusOutlined, RightOutlined, SendOutlined, TeamOutlined, WalletFilled } from '@ant-design/icons'
import { Button, Col, Row } from 'antd'
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import EventDetailsModal from './EventDetailsModal'

const Home = () => {

    const events = [1, 2]
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)

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
                                    <p className='font-sans text-[18px]'>Wedding</p>
                                    <RightOutlined className='bg-primary rounded p-3 hover:cursor-pointer' onClick={() => navigate('/dashboard/event/1')} />
                                </div>
                                <div className='flex mt-5 justify-between'>
                                    <div className='flex'>
                                        <CalendarFilled className='bg-primary p-3 rounded-xl' />
                                        <div className='ml-5'>
                                            <p className='text-[12px] font-medium'>Date</p>
                                            <p className='font-medium text-gray-800'>12-01-1999</p>
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
                                            <p className='font-medium text-gray-800'>9:00 pm</p>
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
                                            <p className='font-medium text-gray-800'>Bahadurabad</p>
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
                                            <p className='font-medium text-gray-800'>$10,000</p>
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
                                            <p className='font-medium text-gray-800'>100</p>
                                        </div>
                                    </div>
                                    <div>
                                        <EditOutlined onClick={() => setIsModalOpen(true)} className='hover:cursor-pointer p-3 rounded-xl' />
                                    </div>
                                </div>

                            </Col>
                        )
                    })
                }
            </Row>

            <div className='mt-5 bg-white rounded-xl p-5'>
                <p className='font-sans text-[20px]'>My checklist</p>
                <p className='text-center font-serif text-[16px]'>You don't have any tasks right now</p>
                <NavLink to={'/dashboard/checklist'}>
                    <p className='font-sans text-red-400 hover:cursor-pointer'>Open checklist <ArrowRightOutlined className='text-[14px]' /></p>
                </NavLink>
            </div>

            <div className='mt-5 bg-white rounded-xl p-5'>
                <p className='font-sans text-[20px]'>Budget Overview</p>
            </div>
            <EventDetailsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    )
}

export default Home