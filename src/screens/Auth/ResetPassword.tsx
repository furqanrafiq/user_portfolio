import React, { useEffect, useState } from "react"
import axios from "axios"
import { apiURL } from "../../../helper"
import { useNavigate, useParams } from "react-router-dom";
import { useNotify } from "../../utils/NotificationProvider";
import { Button, Form, Input } from "antd";
import { LockOutlined } from "@ant-design/icons";


export default function ResetPassword() {
    const navigate = useNavigate()
    const notify = useNotify();
    const params = useParams()
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [tokenVerified, setTokenVerified] = useState(false)

    function verifyToken() {
        return axios.post(`${apiURL}/auth/verify-token?token=${params.token}&email=${params.email}`)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setTokenVerified(true)
            })
            .catch((error) => {
                notify.error({
                    message: 'Error!',
                    description: error.response?.data?.msg,
                    placement: 'topRight',
                });
            })
    }

    function onFinish(values) {
        if (values.password !== values.confirmPassword) {
            return notify.error({
                message: 'Error!',
                description: 'Passwords donot match',
                placement: 'topRight',
            });
        }

        const body = {
            email: params.email,
            password: values.password
        }
        setLoading(true)

        return axios.post(`${apiURL}/auth/reset-password`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                });
                setLoading(false)
                navigate('/login')
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
        verifyToken()
    }, [])

    return (
        <>

            <div className="w-full max-w-md mx-auto my-20">
                {
                    tokenVerified ?
                        <>
                            <div className="text-center mb-8">
                                <p className="font-serif mb-2 text-heading">Reset Password</p>
                                <p className="text-gray-500 font-sans text-[16px]">
                                    Enter your new password
                                </p>
                            </div>
                            <Form
                                name="signin"
                                onFinish={onFinish}
                                layout="vertical"
                                className="mb-6"
                            >
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please enter your password' }]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-gray-400" />}
                                        placeholder="Password"
                                        size="large"
                                        className="rounded-md"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="confirmPassword"
                                    rules={[
                                        { required: true, message: 'Please confirm your password' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('Passwords do not match');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password
                                        prefix={<LockOutlined className="text-gray-400" />}
                                        placeholder="Confirm Password"
                                        size="large"
                                        className="rounded-md"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        block
                                        loading={loading}
                                        disabled={loading}
                                        className="border-none h-12 text-base font-medium"
                                    >
                                        Reset Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                        :
                        <div className="text-center mb-8">
                            <p className="font-serif mb-2 text-heading">Invalid Token</p>
                            <p className="text-gray-500 font-sans text-[16px]">
                                Check your mail for new token email 
                            </p>
                        </div>
                }
            </div>
        </>
    )
}
