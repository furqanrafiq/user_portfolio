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
    const user = useSelector((state) => state?.user?.user)
    const [analytics, setAnalytics] = useState({})
    console.log(analytics)

    function getAdminAnalytics() {
        return api.get(`/user/admin-analytics`)
            .then((res) => setAnalytics(res.data))
    }

    useEffect(() => {
        getAdminAnalytics()
    }, [])

    return (
        <div>
            <p className='font-serif text-[26px]'>Analytics</p>
            <Row className='gap-4 mt-5'>
                <Col md={4} className='bg-white rounded p-4'>
                    <NavLink to={'/dashboard/user-manager'}>
                        <p className='font-sans text-[16px]'>Total Users</p>
                        <p className='font-sans text-[26px]'>{analytics?.totalUsers}</p>
                    </NavLink>
                </Col>
                <Col md={4} className='bg-white rounded p-4'>
                    <NavLink to={'/dashboard/user-manager'}>
                        <p className='font-sans text-[16px]'>Total Active Users</p>
                        <p className='font-sans text-[26px]'>{analytics?.totalActiveUsers}</p>
                    </NavLink>
                </Col>
                <Col md={4} className='bg-white rounded p-4'>
                    <NavLink to={'/dashboard/all-vendors'}>
                        <p className='font-sans text-[16px]'>Total Vendors</p>
                        <p className='font-sans text-[26px]'>{analytics?.totalVendors}</p>
                    </NavLink>
                </Col>
                <Col md={4} className='bg-white rounded p-4'>
                    <NavLink to={'/dashboard/all-bookings'}>
                        <p className='font-sans text-[16px]'>Total Bookings</p>
                        <p className='font-sans text-[26px]'>{analytics?.totalBookings}</p>
                    </NavLink>
                </Col>
                <Col md={4} className='bg-white rounded p-4'>
                    <NavLink to={'/dashboard/user-services'}>
                        <p className='font-sans text-[16px]'>Total Services</p>
                        <p className='font-sans text-[26px]'>{analytics?.totalServices}</p>
                    </NavLink>
                </Col>
            </Row>
        </div>
    )
}

export default AdminDashboard