import React, { useEffect, useMemo } from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Services from './Services';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import Checklist from './Checklist';
import GuestList from './Guestlist';
import { useSelector } from 'react-redux';
import VendorManager from './VendorManager';
import Bookings from './Bookings';
import PaymentDetails from './PaymentDetails';
import AllVendors from '../Dashboard copy/VendorManager/SuggestedVendors';
import UserManager from '../Dashboard copy/UserManager';
import Reviews from '../Dashboard copy/Reviews';
import AdminDashboard from '../Dashboard copy/Home';
import Settings from './Settings';
import UserServices from './UserServices';
import AllBookings from './AllBookings';
import Invoices from './Invoices';

const Dashboard = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector((state) => state?.user?.user)

    const onChange = (key: string) => {
        navigate('/dashboard/' + key);
    };

    const items = useMemo(() => {
        const baseItems = [
            { key: 'home', label: 'Home' },
            { key: 'checklist', label: 'Checklist' },
            { key: 'guests', label: 'Guests' },
            { key: 'vendor-manager/suggested-vendors', label: 'Vendor Manager' },
            { key: 'Invoices', label: 'Invoices' },
        ];

        if (user?.isVendor) {
            baseItems.push({
                key: 'services',
                label: 'My Services'
            });
            baseItems.push({
                key: 'bookings',
                label: 'Bookings'
            });
            baseItems.push({
                key: 'payment-details',
                label: 'Payment details'
            });
        }

        if (user?.isAdmin) {
            baseItems.push({ key: 'user-manager', label: 'Users' });
            baseItems.push({ key: 'all-vendors', label: 'Vendors' });
            baseItems.push({ key: 'reviews', label: 'Reviews' });
            baseItems.push({ key: 'user-services', label: 'User Services' });
            baseItems.push({ key: 'all-bookings', label: 'All Bookings' });
        }

        baseItems.push({ key: 'settings', label: 'Settings' });

        return baseItems;
    }, [user]);

    return (
        <div className='my-10'>
            <div className='container mx-auto'>
                <Tabs type='card' defaultActiveKey="1" items={items} onChange={onChange} activeKey={location.pathname.split('/').pop()} // Set active tab based on URL
                />
                <Routes>
                    <Route path="home" element={user?.isAdmin ? <AdminDashboard /> : <Home />} />
                    <Route path="checklist" element={<Checklist />} />
                    <Route path="payment-details" element={<PaymentDetails />} />
                    <Route path="guests" element={<GuestList />} />
                    <Route path="vendor-manager/*" element={<VendorManager location={location} />} />
                    <Route path="saved" element={<Dashboard />} />
                    <Route path="services" element={<Services />} />
                    <Route path="bookings" element={<Bookings />} />
                    <Route path="all-vendors" element={<AllVendors />} />
                    <Route path="user-manager" element={<UserManager />} />
                    <Route path="reviews" element={<Reviews />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path="user-services" element={<UserServices />} />
                    <Route path="all-bookings" element={<AllBookings />} />
                    <Route path="invoices" element={<Invoices />} />
                </Routes >
            </div>
        </div>
    )
}

export default Dashboard