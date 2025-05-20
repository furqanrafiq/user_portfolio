import React, { useState } from "react"
import axios from "axios"
import { apiURL } from "../../../helper"
import { notification, Radio, Select, Switch } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Form, Input, Button, Typography, Divider } from 'antd';
import {
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';
import { openNotification } from "../../utils/notifications";
import { useNotify } from "../../utils/NotificationProvider";
import { NavLink } from "react-router-dom";
import AllServices from "../../components/dropdowns/allServices";

interface FormData {
    [key: string]: string;
}

export default function SignUp() {

    // const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(Boolean)
    const notify = useNotify();
    const [isVendor, setIsVendor] = useState(Boolean)
    // const [service, setService] = useState(Object)

    // function handleService(data) {
    //     setService(data)
    // }

    const onFinish = (values: any) => {
        const body = { ...values }
        body.isVendor = isVendor;
        // body.service = service
        setLoading(true)
        return axios.post(`${apiURL}/auth/register`, body)
            .then((res) => {
                notify.success({
                    message: 'Success!',
                    description: res.data.msg,
                    placement: 'topRight',
                }); setLoading(false)
            })
            .catch((res) => {
                notify.success({
                    message: 'Error',
                    description: res.msg,
                    placement: 'topRight',
                });
                setLoading(false)
            })
    }

    return (
        <>
            <div className="w-full max-w-md mx-auto my-20">
                {/* <div className="text-center mb-8">
                    <p className="font-serif mb-2 text-heading">Join Easyshadi</p>
                    <p className="text-gray-500 font-sans text-[16px]">
                        Select which profile you want to sign in for
                    </p>
                    <div className="flex gap-4 mt-10 ">
                        <div className="user-selection-box w-[200px] border border-gray-900 rounded-[14px] p-[20px] hover:shadow-lg hover:cursor-pointer" onClick={() => setIsVendor(false)}>
                            <UserOutlined style={{ fontSize: '30px' }} />
                            <p className="text-gray-500 font-sans text-[16px]">User</p>
                        </div>
                        <div className="user-selection-box w-[200px] border border-gray-900 rounded-[14px] p-[20px] hover:shadow-lg hover:cursor-pointer" onClick={() => setIsVendor(true)}>
                            <UserOutlined style={{ fontSize: '30px' }} />
                            <p className="text-gray-500 font-sans text-[16px]">Vendor</p>
                        </div>
                    </div>
                </div> */}
                <div className="text-center mb-8">
                    <p className="font-serif mb-2 text-heading">Join Easyshadi</p>
                    <p className="text-gray-500 font-sans text-[16px]">
                        Create a free account to unlock your personalized event planning dashboard.
                    </p>
                </div>
                <Form
                    name="signin"
                    onFinish={onFinish}
                    layout="vertical"
                    className="mb-6"
                >
                    <Form.Item
                        name="name"
                        rules={[
                            { required: true, message: 'Please enter your name' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Name"
                            size="large"
                            className="rounded-md"
                        />
                    </Form.Item>

                    <Form.Item
                        name="phoneNumber"
                        rules={[
                            { required: true, message: 'Please enter your phone number' }
                        ]}
                    >
                        <Input
                            prefix={<PhoneOutlined rotate={90} className="text-gray-400" />}
                            placeholder="Phone Number"
                            size="large"
                            className="rounded-md"
                        />
                    </Form.Item>

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

                    <div className="flex">
                        <p className="mr-3">Are you a vendor?</p>
                        <Switch
                            value={isVendor}
                            onChange={setIsVendor}
                        />
                    </div>

                    {/* <div className="mt-5">
                        <AllServices isDisabled={!isVendor} handleService={handleService} />
                    </div> */}

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                            disabled={loading}
                            className="mt-5 border-none h-12 text-base font-medium"
                        >
                            Sign In
                        </Button>
                    </Form.Item>
                </Form>
                <div className="text-center space-y-4">
                    <div>
                        <p className="text-gray-500">
                            Already have an account?{' '}
                            <NavLink to={'/login'} className="font-sans text-blue-500">Login</NavLink>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
