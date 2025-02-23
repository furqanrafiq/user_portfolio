import React, { useState } from "react"
import axios from "axios"
import { apiURL } from "../../../helper"
import { notification } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined } from '@ant-design/icons';

import type { NotificationArgsProps } from 'antd';
import { Layout, Form, Input, Button, Typography, Divider } from 'antd';
import {
    HeartFilled,
    GoogleOutlined,
    FacebookFilled,
    AppleFilled,
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const { Content } = Layout;
const { Text } = Typography;


type NotificationPlacement = NotificationArgsProps['placement'];

interface FormData {
    [key: string]: string;
}

export default function Login() {

    const [api, contextHolder] = notification.useNotification();
    // const [formData, setFormData] = useState<FormData>({});
    const [loading, setLoading] = useState(Boolean)
    const navigate = useNavigate()

    // const handleInputChange = (name: string, value: string) => {
    //     setFormData((prevData) => ({ ...prevData, [name]: value }));
    // };

    const openNotification = (placement: NotificationPlacement, status: boolean, message: string) => {
        if (status) {
            api.info({
                message,
                placement,
                icon: <CheckCircleTwoTone twoToneColor={"#52c41a"} />
            });
        } else {
            api.info({
                message,
                placement,
                icon: <CloseCircleTwoTone twoToneColor={"#eb2f96"} />
            });
        }
    };

    const onFinish = (values: any) => {
        const formData = { ...values }
        setLoading(true)
        return axios.post(`${apiURL}/api/auth/login`, formData)
            .then((res) => {
                openNotification('topRight', true, res.data.msg)
                setLoading(false)
                navigate('/dashboard')
            })
            .catch((res) => {
                openNotification('topRight', false, res.response.data.msg)
                setLoading(false)
            })
    }

    return (
        <>
            {contextHolder}
            {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Login
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="text-left block text-sm/6 fnt-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 items-center"
                                disabled={loading}
                            >
                                {loading && <LoadingOutlined color="white" className="mr-2" />}
                                Sign in
                            </button>
                        </div>
                    </form>

                    <NavLink to={'/'}>
                        <p
                            className="text-indigo-600 hover:text-indigo-500 mt-2 text-sm"
                        // onClick={() => openNotification('topRight', false)}
                        >
                            Don't have an account? Signup
                        </p>
                    </NavLink>
                </div>
            </div> */}
            <div className="w-full max-w-md mx-auto my-20">
                {/* Logo */}
                <div className="text-center mb-8">
                    <p className="font-serif mb-2 text-heading">Welcome Back</p>
                    <p className="text-gray-500 font-sans text-[16px]">
                        Sign in to access your wedding planning tools
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
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center space-y-4">
                    <Text className="text-gray-500">
                        <a href="#" className="font-sans">Forgot your password?</a>
                    </Text>
                    <div>
                        <Text className="text-gray-500">
                            Don't have an account?{' '}
                            <a href="#" className="font-sans">Sign up</a>
                        </Text>
                    </div>
                </div>
            </div>
        </>
    )
}
