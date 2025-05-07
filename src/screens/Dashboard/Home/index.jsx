import { ArrowRightOutlined, CalendarFilled, CalendarOutlined, ClockCircleFilled, ClockCircleOutlined, EditOutlined, GroupOutlined, PinterestFilled, PlusOutlined, RightOutlined, SendOutlined, TeamOutlined, WalletFilled } from '@ant-design/icons'
import { Button, Col, Row, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import EventDetailsModal from './EventDetailsModal'
import api from '../../../../axiosInterceptor'
import { useSelector } from 'react-redux'
import moment from 'moment'
import TransactionModal from './TransactionModal'

const Home = () => {

    // const events = [1, 2]
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [transactionModal, setTransactionModal] = useState(false)
    const user = useSelector((state) => state?.user?.user)
    const [events, setEvents] = useState([])
    const [checkList, setCheckList] = useState([])
    const [userTransactions, setUserTransactions] = useState([])
    const [selectedEvent, setSelectedEvent] = useState({})
    const [selectedTransaction, setSelectedTransaction] = useState({})

    function getUserEvents() {
        return api.get(`/events/get-user-events?userId=${user?.uuid}`)
            .then((res) => setEvents(res.data))
    }

    function getUserChecklist() {
        return api.get(`/checklist/get-user-checklist?userId=${user?.uuid}`)
            .then((res) => setCheckList(res.data))
    }

    function getUserTransactions() {
        return api.get(`/transactions/get-user-transactions?userId=${user?.uuid}`)
            .then((res) => setUserTransactions(res.data))
    }

    useEffect(() => {
        getUserChecklist()
        getUserEvents()
        getUserTransactions()
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
            render: (_, record) => (
                <p>{record?.eventDetails?.eventType}</p>
            ),

        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: 'dueDate',
            render: (_, record) => (
                <p>{moment(record?.dueDate).format('DD-MM-yyyy')}</p>
            ),
        }
    ];


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
                <p className='font-sans text-[20px]'>My checklist</p>
                {
                    checkList?.length > 0 ?
                        <Table columns={checklistColumns} dataSource={checkList} className='mt-3' />
                        :
                        <p className='text-center font-serif text-[16px] mt-3'>You don't have any tasks right now</p>
                }
                <NavLink to={'/dashboard/checklist'}>
                    <p className='font-sans text-red-400 hover:cursor-pointer'>Open checklist <ArrowRightOutlined className='text-[14px]' /></p>
                </NavLink>
            </div>

            <div className='mt-5 bg-white rounded-xl p-5'>
                <p className='font-sans text-[20px]'>Budget Overview</p>
                <Row gutter={24} className='mt-3'>
                    <Col md={6}>
                        <div className='border-2 rounded-lg border-black-500 p-2'>
                            <p className='font-sans text-[14px] font-bold'>Event Breakdown</p>
                            {
                                events?.map((item) => {
                                    return (
                                        <div key={item.uuid} className='mt-3'>
                                            <div className='flex justify-between'>
                                                <div>
                                                    <p>{item.eventType}</p>
                                                </div>
                                                <div>
                                                    <p>$ {item.eventBudget}</p>
                                                </div>
                                            </div>
                                            <Tooltip title={`$${item.totalSpent}`}>
                                                <div className='flex'>
                                                    <div style={{ background: `${item.totalSpent < item.eventBudget ? 'black' : '#ff5050'}`, width: `${item.amountSpent < item.eventBudget ? item.amountSpent : 100}%`, height: '5px', borderRadius: '10px', marginTop: '5px' }}></div>
                                                    <div style={{ background: 'lightgrey', width: `${item.totalSpent < item.eventBudget ? 100 - item.amountSpent : 0}%`, height: '5px', borderRadius: '10px', marginTop: '5px' }}></div>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </Col>
                    <Col md={18}>
                        <div className='border-2 rounded-lg border-black-500 p-2'>
                            <p className='font-sans text-[14px] font-bold'>Recent Transactions</p>
                            <div className=''>
                                {
                                    userTransactions?.map((item) => {
                                        return (
                                            <div key={item.uuid} className='border-2 rounded-lg p-2 justify-between flex cursor-pointer hover:bg-gray-100 mt-3' onClick={() => { setSelectedTransaction(item); setTransactionModal(true) }}>
                                                <div>
                                                    <p className='font-[500]'>{item?.vendorName}</p>
                                                    <p className='text-[12px]'>Spent on {item?.eventDetails?.eventType} · {moment(item?.transactionDate).format('Do MMMM, YYYY')}</p>
                                                </div>
                                                <div className='text-end'>
                                                    <p className=''>${item?.amount}</p>
                                                    <p className='text-[12px]'>{item?.paymentType}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <p className='font-sans text-[14px] cursor-pointer hover:underline mt-3' onClick={() => setTransactionModal(true)}>Add Transaction +</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <EventDetailsModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
            <TransactionModal isModalOpen={transactionModal} setIsModalOpen={setTransactionModal} userEvents={events} selectedTransaction={selectedTransaction} setSelectedTransaction={setSelectedTransaction} getUserTransactions={getUserTransactions} getUserEvents={getUserEvents} />
        </div>
    )
}

export default Home