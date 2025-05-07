import { CalendarFilled, ClockCircleFilled, DeleteOutlined, EditOutlined, LeftOutlined, RightOutlined, SendOutlined, TeamOutlined, WalletFilled } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../../../axiosInterceptor'
import { apiURL } from '../../../../helper'
import { useSelector } from 'react-redux'
import { Space, Table, Tooltip } from 'antd'
import moment from 'moment'
import TransactionModal from './TransactionModal'

const EventDetailPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const [event, setEvent] = useState({})
    const [userChecklist, setUserChecklist] = useState([])
    const user = useSelector((state) => state?.user?.user)
    const [userTransactions, setUserTransactions] = useState([])
    const [transactionModal, setTransactionModal] = useState(false)
    const [selectedTransaction, setSelectedTransaction] = useState({})
    const [events, setEvents] = useState([])
    console.log(event)

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
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{ cursor: 'pointer' }} />
                    <DeleteOutlined style={{ cursor: 'pointer' }} />
                </Space>
            ),
        },
    ];

    function getUserEvents() {
        return api.get(`/events/get-user-events?userId=${user?.uuid}`)
            .then((res) => setEvents(res.data))
    }

    function getEventDetails() {
        return api.get(`${apiURL}/events/event-details?eventId=${params.eventId}`)
            .then((res) => setEvent(res.data))
    }

    function getUserChecklist() {
        return api.get(`/checklist/get-user-checklist?userId=${user?.uuid}&eventId=${params.eventId}`)
            .then((res) => setUserChecklist(res.data))
    }

    function getUserTransactions() {
        return api.get(`/transactions/get-user-transactions?userId=${user?.uuid}&eventId=${params.eventId}`)
            .then((res) => setUserTransactions(res.data))
    }


    useEffect(() => {
        getEventDetails()
        getUserChecklist()
        getUserTransactions()
        getUserEvents()
    }, [])

    return (
        <div className='container mx-auto my-5'>
            <div className='flex items-center'>
                <LeftOutlined className='mr-3' onClick={() => navigate(-1)} />
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
                <p className='font-sans text-[18px] mb-3'>Event Checklist</p>
                <Table columns={checklistColumns} dataSource={userChecklist} />
            </div>

            <div className='mt-5 bg-white p-5 rounded-xl'>
                <p className='font-sans text-[18px]'>Recent Transactions</p>
                <div className='rounded-lg border-black-500'>
                    <div className='mt-3'>
                        <p className='text-[13px] font-sans'>Total spent on {event?.eventType}</p>
                        <p className='font-sans text-[24px]'>${event?.totalSpent}</p>
                        {
                            userTransactions?.map((item) => {
                                return (
                                    <div key={item.uuid} className='border-2 rounded-lg p-2 justify-between flex cursor-pointer hover:bg-gray-100 mt-3' onClick={() => { setSelectedTransaction(item); setTransactionModal(true) }}>                                        <div>
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
                    <p className='font-sans text-[14px] cursor-pointer hover:underline mt-3'
                        onClick={() => setTransactionModal(true)}
                    >Add Transaction +</p>
                </div>
            </div>

            <TransactionModal isModalOpen={transactionModal} setIsModalOpen={setTransactionModal} userEvents={events} selectedTransaction={selectedTransaction} setSelectedTransaction={setSelectedTransaction} getUserTransactions={getUserTransactions} />

        </div>
    )
}

export default EventDetailPage