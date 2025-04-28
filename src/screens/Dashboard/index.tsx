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
            { key: 'vendor-manager', label: 'Vendor Manager' },
        ];

        if (user?.isVendor) {
            baseItems.push({
                key: 'services',
                label: 'Services'
            });
            baseItems.push({
                key: 'bookings',
                label: 'Bookings'
            });
        }

        return baseItems;
    }, [user]);

    return (
        <div className='my-10'>
            <div className='container mx-auto'>
                <Tabs type='card' defaultActiveKey="1" items={items} onChange={onChange} activeKey={location.pathname.split('/').pop()} // Set active tab based on URL
                />
                <Routes>
                    <Route path="home" element={<Home />} />
                    <Route path="checklist" element={<Checklist />} />
                    <Route path="guests" element={<GuestList />} />
                    <Route path="vendor-manager/*" element={<VendorManager location={location} />} />
                    <Route path="saved" element={<Dashboard />} />
                    <Route path="services" element={<Services />} />
                    <Route path="bookings" element={<Bookings />} />
                </Routes >
            </div>
        </div>
    )
}

export default Dashboard