import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import Services from './Services';

const onChange = (key: string) => {
    console.log(key);
};

const Dashboard = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Home',
            children: 'Content of Tab Pane 1',
        },
        {
            key: '2',
            label: 'Checklist',
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: 'Guests',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '4',
            label: 'Vendor Manager',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '5',
            label: 'Saved',
            children: 'Content of Tab Pane 3',
        },
        {
            key: '6',
            label: 'Services',
            children: <Services />,
        },
    ];

    return (
        <div className='my-10'>
            <div  className='container mx-auto'>
                <Tabs type='card' defaultActiveKey="1" items={items} onChange={onChange} />
            </div>
        </div>
    )
}

export default Dashboard