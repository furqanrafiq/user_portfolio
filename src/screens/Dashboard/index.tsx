import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Services from './Services';
import { useLocation, useNavigate } from 'react-router-dom';
import Home from './Home';
import Checklist from './Checklist';
import GuestList from './Guestlist';


const Dashboard = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const onChange = (key: string) => {
        navigate('/dashboard/' + key);
    };


    const items: TabsProps['items'] = [
        {
            key: 'home',
            label: 'Home',
            children: <Home />,
        },
        {
            key: 'checklist',
            label: 'Checklist',
            children: <Checklist />,
        },
        {
            key: 'guests',
            label: 'Guests',
            children: <GuestList />,
        },
        {
            key: 'vendor-manager',
            label: 'Vendor Manager',
            children: 'Content of Tab Pane 3',
        },
        {
            key: 'saved',
            label: 'Saved',
            children: 'Content of Tab Pane 3',
        },
        {
            key: 'services',
            label: 'Services',
            children: <Services />,
        },
    ];

    return (
        <div className='my-10'>
            <div className='container mx-auto'>
                <Tabs type='card' defaultActiveKey="1" items={items} onChange={onChange} activeKey={location.pathname.split('/').pop()} // Set active tab based on URL
                />
            </div>
        </div>
    )
}

export default Dashboard