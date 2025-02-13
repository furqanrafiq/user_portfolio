import React, { useState } from "react"
import axios from "axios"
import { apiURL } from "../../../helper"
import { notification } from 'antd';
import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined } from '@ant-design/icons';

import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

interface FormData {
    [key: string]: string;
}

export default function SignUp() {

    const [api, contextHolder] = notification.useNotification();
    const [formData, setFormData] = useState<FormData>({});
    const [loading, setLoading] = useState(Boolean)

    const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

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

    const handleSubmit = (e: any) => {
        e.preventDefault()
        setLoading(true)
        return axios.post(`${apiURL}/api/auth/register`, formData)
            .then((res) => {
                openNotification('topRight', true, res.data.msg)
                setLoading(false)
            })
            .catch((res) => {
                openNotification('topRight', false, res.response.data.msg)
                setLoading(false)
            })
    }

    return (
        <>
            {contextHolder}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form action="#" method="POST" className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="text-left block text-sm/6 fnt-medium text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="name"
                                    required
                                    autoComplete="name"
                                    onChange={(e) => handleInputChange(e.target.name, e.target.value)}
                                    className="block w-full border rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

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
                                {loading && <LoadingOutlined color="white" className="mr-2"/>}
                                Sign in
                            </button>
                        </div>
                    </form>
                    {/* 
                    <button
                        // type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => openNotification('topRight', false)}
                    >
                        open
                    </button> */}
                </div>
            </div>
        </>
    )
}
