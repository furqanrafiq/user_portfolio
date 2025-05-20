import { Tabs } from 'antd';
import React, { useState } from 'react'
import SavedVendors from './SavedVendors';
import SuggestedVendors from './SuggestedVendors';
import { Route, Routes, useNavigate } from 'react-router-dom';

const VendorManager = ({ location }) => {

    const navigate = useNavigate()
    const items = [
        { key: 'saved-vendors', label: 'Saved Vendors' },
        { key: 'suggested-vendors', label: 'Suggested Vendors' },
    ];

    const onChange = (key: string) => {
        navigate('/dashboard/vendor-manager/' + key);
    };

    return (
        <div>
            <Tabs type='card' items={items} defaultChecked="saved-vendors" onChange={onChange} activeKey={location.pathname.split('/').pop()} />
            <Routes>
                <Route path="saved-vendors" element={<SavedVendors />} />
                <Route path="suggested-vendors" element={<SuggestedVendors />} />
            </Routes >
        </div>
    )
}

export default VendorManager