import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
    const [sharedState, setSharedState] = useState({});

    return <Outlet context={{ sharedState, setSharedState }} />;
};

export default Layout;
