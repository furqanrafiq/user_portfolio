import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../screens/Home/Home.jsx'
import Login from '../screens/Auth/Login.js'
import SignUp from '../screens/Auth/SignUp.js'
import GuestList from '../screens/GuestList/index.jsx'
import CheckList from '../screens/Checklist.jsx/index.jsx'
import VendorManager from '../screens/VendorManager/index.jsx'
import WeddingVenue from '../screens/VenuesVendors/WeddingVenue.jsx'
import DetailPage from '../screens/VenuesVendors/DetailPage.jsx'

const PublicRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/guest-list" element={<GuestList />} />
            <Route path="/check-list" element={<CheckList />} />
            <Route path="/vendor-manager" element={<VendorManager />} />
            <Route path="/services/:serviceName" element={<WeddingVenue />} />
            <Route path="/service-details/:serviceId" element={<DetailPage />} />
        </Routes>
    )
}

export default PublicRoutes