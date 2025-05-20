import { ArrowRightOutlined, CalendarFilled, CalendarOutlined, ClockCircleFilled, ClockCircleOutlined, EditOutlined, GroupOutlined, PinterestFilled, PlusOutlined, RightOutlined, SendOutlined, TeamOutlined, WalletFilled } from '@ant-design/icons'
import { Button, Col, Row, Table, Tooltip } from 'antd'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import EventDetailsModal from './EventDetailsModal'
import api from '../../../../axiosInterceptor'
import { useSelector } from 'react-redux'
import moment from 'moment'
import TransactionModal from './TransactionModal'

const AdminDashboard = () => {

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
            <p className='font-serif text-[26px]'>Analytics</p>
            <Row className='gap-4 mt-5'>
                <Col md={4} className='bg-white rounded p-4'>
                    <p className='font-sans text-[16px]'>Total Users</p>
                    <p className='font-sans text-[26px]'>0</p>
                </Col>
                <Col md={4} className='bg-white rounded p-4'>
                    <p className='font-sans text-[16px]'>Total Active Users</p>
                    <p className='font-sans text-[26px]'>0</p>
                </Col>
                <Col md={4} className='bg-white rounded p-4'>
                    <p className='font-sans text-[16px]'>Total Vendors</p>
                    <p className='font-sans text-[26px]'>0</p>
                </Col>
                <Col md={4} className='bg-white rounded p-4'>
                    <p className='font-sans text-[16px]'>Total Bookings</p>
                    <p className='font-sans text-[26px]'>0</p>
                </Col>
                <Col md={4} className='bg-white rounded p-4'>
                    <p className='font-sans text-[16px]'>Total Services</p>
                    <p className='font-sans text-[26px]'>0</p>
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboard