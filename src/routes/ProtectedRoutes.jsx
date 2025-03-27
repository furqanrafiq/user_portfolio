import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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

const ProtectedRoutes = () => {

    const dispatch = useDispatch()
    const user = localStorage.getItem('easyShadiUser')

    useEffect(() => {
        if (user) {
            api.get("/api/user/user-details")
                .then((res) => {
                    dispatch(storeUserReducer(res.data.user));
                })
                .catch(() => {
                    dispatch(storeUserReducer(null));
                })
        }
    }, [user, dispatch]);

    return (
        <Routes>
            <Route element={<PrivateRouteHelper />}>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/home" element={<Dashboard />} />
                    <Route path="/dashboard/checklist" element={<Dashboard />} />
                    <Route path="/dashboard/guests" element={<Dashboard />} />
                    <Route path="/dashboard/vendor-manager" element={<Dashboard />} />
                    <Route path="/dashboard/saved" element={<Dashboard />} />
                    <Route path="/dashboard/services" element={<Dashboard />} />
                    <Route path="/dashboard/event/create/1"  element={<EventType />}/>
                    <Route path="/dashboard/event/create/2" element={<GuestCount />} />
                    <Route path="/dashboard/event/create/3" element={<EventBudget />} />
                    <Route path="/dashboard/event/create/4" element={<EventLocation />} />
                    <Route path="/dashboard/event/create/5" element={<EventDate />} />
                    <Route path="/dashboard/event/:eventId" element={<EventDetailPage />} />
                    {/* <Route path="/dashboard/event/create/2" element={<GuestCount />} />
                <Route path="/dashboard/event/create/3" element={<EventBudget />} />
                <Route path="/dashboard/event/create/4" element={<EventLocation />} />
                <Route path="/dashboard/event/create/5" element={<EventDate />} /> */}
                </Route>
            </Route>
        </Routes>
    );
};

export default ProtectedRoutes;