import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Spin } from "antd";

const PrivateRouteHelper = () => {
    const user = useSelector((state) => state?.user?.user); // Get user from Redux
    
    return user?.id ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouteHelper;
