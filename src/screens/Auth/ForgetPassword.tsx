import React, { useState } from "react"
import axios from "axios"
import { apiURL } from "../../../helper"

import type { NotificationArgsProps } from 'antd';
import { Layout, Form, Input, Button, Typography, Divider } from 'antd';
import {
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';
import { NavLink, useNavigate } from "react-router-dom";
import { openNotification } from "../../utils/notifications";
import { useNotify } from "../../utils/NotificationProvider";
import { storeUserReducer } from "./redux/authSlice";
import { useDispatch } from "react-redux";

const { Text } = Typography;

interface FormData {
    [key: string]: string;
}

export default function ForgetPassword() {
    const [loading, setLoading] = useState(Boolean)
    const navigate = useNavigate()
    const notify = useNotify();
    const dispatch = useDispatch()

    const onFinish = (values: any) => {
        const formData = { ...values }
        setLoading(true)
        return axios.post(`${apiURL}/auth/forget-password`, formData)
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
                setLoading(false)
            })
    }

    return (
        <>
            <div className="w-full max-w-md mx-auto my-20">
                <div className="text-center mb-8">
                    <p className="font-serif mb-2 text-heading">Forget Password</p>
                    <p className="text-gray-500 font-sans text-[16px]">
                        Enter your email to reset your password
                    </p>
                </div>

                {/* Email Sign In Form */}
                <Form
                    name="signin"
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' }
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="text-gray-400" />}
                            placeholder="Email"
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
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center space-y-4">
                    <Text className="text-gray-500">
                        <NavLink to={'/login'} className="font-sans">Back to login</NavLink>
                    </Text>
                </div>
            </div>
        </>
    )
}
