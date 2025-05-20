import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import api from "../../axiosInterceptor";
import { apiURL } from "../../helper";
import { storeUserReducer } from "../screens/Auth/redux/authSlice";
import Dashboard from "../screens/Dashboard";
import PrivateRouteHelper from "../components/auth/ProtectedRouteHelper";
import EventDetailPage from "../screens/Dashboard/Home/EventDetailPage";
import EventType from "../screens/Dashboard/EventCreation/EventType";
import GuestCount from "../screens/Dashboard/EventCreation/GuestCount";
import EventBudget from "../screens/Dashboard/EventCreation/EventBudget";
import EventLocation from '../screens/Dashboard/EventCreation/EventLocation'
import EventDate from "../screens/Dashboard/EventCreation/EventDate";
import Layout from "./Layout";
import AdminDashboard from "../screens/Dashboard copy";

const ProtectedRoutes = () => {

    const user = useSelector((state) => state?.user?.user)

    return (
        <>
            {
                user?._id ?
                    <Routes>
                        < Route element={< PrivateRouteHelper />}>
                            <Route path="/dashboard/*" element={<Dashboard />} />
                            <Route
                                path="/dashboard/event/create/*"
                                element={<Layout />}
                            />
                            <Route path="/dashboard/event/:eventId" element={<EventDetailPage />} />
                        </Route >
                    </Routes >
                    :
                    <Navigate to="/login" replace />
            }
        </>
    );
};

export default ProtectedRoutes;