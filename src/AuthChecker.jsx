import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserReducer } from "./screens/Auth/redux/authSlice";
import api from "../axiosInterceptor";

const AuthChecker = ({ children }) => {
    const navigate = useNavigate();
    const user = localStorage.getItem('easyShadiUser')
    const dispatch = useDispatch()

    const checkUserAuth = async () => {
        try {
            return api.get("/user/user-details")
                .then((res) => {
                    dispatch(storeUserReducer(res.data.user));
                })
                .catch(() => {
                    dispatch(storeUserReducer(null));
                    localStorage.removeItem("easyShadiUser");
                    navigate("/login");
                })
        } catch (error) {
            // Any error → clear and redirect
            dispatch(storeUserReducer(null));
            localStorage.removeItem("easyShadiUser");
            navigate("/login");
        }
    };


    useEffect(() => {
        if (user)
            checkUserAuth();
    }, []);

    return children;
};

export default AuthChecker;
