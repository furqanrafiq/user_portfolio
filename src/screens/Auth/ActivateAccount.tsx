import React, { useEffect, useState } from "react"
import axios from "axios"
import { apiURL } from "../../../helper"
import { useNavigate, useParams } from "react-router-dom";
import { useNotify } from "../../utils/NotificationProvider";
import { Button } from "antd";


export default function ActivateAccount() {
    const navigate = useNavigate()
    const notify = useNotify();
    const params = useParams()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    function activateAccount() {
        return axios.post(`${apiURL}/auth/activate-account?token=${params.token}`)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                navigate('/login')
            })
            .catch((error) => {
                notify.error({
                    message: 'Error!',
                    description: error.response?.data?.msg,
                    placement: 'topRight',
                });
                setError(true)
            })
    }

    function resendActivationEmail() {
        setLoading(true)
        return axios.post(`${apiURL}/auth/resend-activation-email?email=${params.email}`)
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

    useEffect(() => {
        activateAccount()
    }, [])

    return (
        <>

            <div className="w-full max-w-md mx-auto my-20">
                <div className="text-center mb-8">
                    <p className="font-serif mb-2 text-heading">
                        {!error ?
                            'Activating Account...'
                            :
                            'Resend activation link'
                        }
                    </p>

                    {error &&
                        <Button type="primary" loading={loading} disabled={loading} onClick={() => resendActivationEmail()}>Resend</Button>
                    }
                </div>
            </div>
        </>
    )
}
