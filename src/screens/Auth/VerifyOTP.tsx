import React, { useEffect, useState } from "react"
import axios from "axios"
import { apiURL } from "../../../helper"
import { useNavigate, useParams } from "react-router-dom";
import { useNotify } from "../../utils/NotificationProvider";
import { Button, Input } from "antd";
import { useDispatch } from "react-redux";
import { storeUserReducer } from "./redux/authSlice";


export default function VerifyOTP() {
    const navigate = useNavigate()
    const notify = useNotify();
    const params = useParams()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [otp, setOtp] = useState()
    const dispatch = useDispatch()


    function resendOtp() {
        setLoading(true)
        return axios.post(`${apiURL}/auth/resend-otp?email=${params.email}`)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
            })
            .catch((error) => {
                notify.error({
                    message: 'Error!',
                    description: error.response?.data?.msg,
                    placement: 'topRight',
                });
                setError(true)
                setLoading(false)
            })
    }

    function submitOtp() {
        setLoading(true)
        return axios.post(`${apiURL}/auth/verify-otp?email=${params.email}&otp=${otp}`)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                localStorage.setItem('easyShadiUser', res.data.user.token)
                dispatch(storeUserReducer(res.data.user.user))
                navigate('/dashboard/home')
            })
            .catch((error) => {
                notify.error({
                    message: 'Error!',
                    description: error.response?.data?.msg,
                    placement: 'topRight',
                });
                setError(true)
                setLoading(false)
            })
    }

    const onChange = (text) => {
        setOtp(text)

    };

    return (
        <>
            <div className="w-full max-w-md mx-auto my-20">
                <div className="text-center mb-8">
                    <p className="font-serif mb-2 text-heading">
                        Verify OTP
                    </p>
                    <Input.OTP formatter={(str) => str.toUpperCase()} disabled={loading} onChange={onChange} size="large" />
                    <br />
                    <Button className="mt-3" type="primary" loading={loading} disabled={loading} onClick={() => submitOtp()}>Submit</Button>
                    <br />
                    <Button className="mt-3" type="primary" loading={loading} disabled={loading} onClick={() => resendOtp()}>Resend OTP</Button>
                </div>
            </div>
        </>
    )
}
