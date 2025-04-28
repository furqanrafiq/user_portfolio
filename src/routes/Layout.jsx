import { Outlet, Route, Routes } from "react-router-dom";
import { useState } from "react";
import EventType from "../screens/Dashboard/EventCreation/EventType";
import GuestCount from "../screens/Dashboard/EventCreation/GuestCount";
import EventBudget from "../screens/Dashboard/EventCreation/EventBudget";
import EventLocation from "../screens/Dashboard/EventCreation/EventLocation";
import EventDate from "../screens/Dashboard/EventCreation/EventDate";

const Layout = () => {
    const [eventData, setEventData] = useState({});
    return (
        <Routes>
            <Route path="1" element={<EventType eventData={eventData} setEventData={setEventData} />} />
            <Route path="2" element={<GuestCount eventData={eventData} setEventData={setEventData} />} />
            <Route path="3" element={<EventBudget eventData={eventData} setEventData={setEventData} />} />
            <Route path="4" element={<EventLocation eventData={eventData} setEventData={setEventData} />} />
            <Route path="5" element={<EventDate eventData={eventData} setEventData={setEventData} />} />
        </Routes >
    )
};

export default Layout;
